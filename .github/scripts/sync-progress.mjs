/**
 * Parses progress Issue body and updates README.md between markers.
 * Run by .github/workflows/sync-progress.yml
 */

import { readFileSync, writeFileSync } from "fs";

const MARKER_START = "<!-- PROGRESS:START -->";
const MARKER_END = "<!-- PROGRESS:END -->";

const token = process.env.GITHUB_TOKEN;
const repoFull = process.env.GITHUB_REPOSITORY;
const serverUrl = process.env.GITHUB_SERVER_URL || "https://github.com";

if (!token || !repoFull) {
  console.error("GITHUB_TOKEN and GITHUB_REPOSITORY required");
  process.exit(1);
}

const [owner, repo] = repoFull.split("/");

async function github(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

function bar(ratio, width = 10) {
  const filled = Math.round(Math.max(0, Math.min(1, ratio)) * width);
  return "█".repeat(filled) + "░".repeat(width - filled);
}

function pct(checked, total) {
  if (total === 0) return 0;
  return Math.round((checked / total) * 100);
}

function parseProgress(body) {
  const lines = body.split("\n");
  let section = "До старта";
  let currentDay = null;

  const buckets = {};
  const dayStats = {};

  const ensure = (key) => {
    if (!buckets[key]) buckets[key] = { checked: 0, total: 0 };
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      section = line.slice(3).trim();
      currentDay = null;
      ensure(section);
      continue;
    }

    const dayMatch = line.match(/^### (DAY \d{2})/);
    if (dayMatch) {
      currentDay = dayMatch[1];
      dayStats[currentDay] = { checked: 0, total: 0, section };
      continue;
    }

    const cb = line.match(/^- \[([ xX])\] /);
    if (!cb) continue;

    const done = cb[1].toLowerCase() === "x";
    ensure(section);
    buckets[section].total++;
    if (done) buckets[section].checked++;

    if (currentDay) {
      dayStats[currentDay].total++;
      if (done) dayStats[currentDay].checked++;
    }
  }

  let totalChecked = 0;
  let totalAll = 0;
  for (const b of Object.values(buckets)) {
    totalChecked += b.checked;
    totalAll += b.total;
  }

  const weekOrder = [
    "До старта",
    "Неделя 1",
    "Неделя 2",
    "Неделя 3",
    "Неделя 4",
    "Неделя 5",
  ];

  const weekRows = weekOrder
    .filter((w) => buckets[w])
    .map((w) => {
      const b = buckets[w];
      const daysInWeek = Object.entries(dayStats).filter(([, d]) => d.section === w);
      const daysTotal = daysInWeek.length;
      const daysDone = daysInWeek.filter(([, d]) => d.total > 0 && d.checked === d.total).length;
      return { name: w, ...b, daysDone, daysTotal };
    });

  return { totalChecked, totalAll, weekRows, dayStats };
}

function buildBlock(issue) {
  const createUrl = `${serverUrl}/${owner}/${repo}/issues/new?template=course_progress.md`;

  if (!issue) {
    return `### 📊 Прогресс прохождения

| | |
|---|---|
| **Статус** | Issue ещё не создан |
| **Действие** | **[→ Создать трекер прогресса](${createUrl})** |

Отметь чекбоксы в Issue — этот блок обновится автоматически (~1 мин).

<details>
<summary>Как это работает</summary>

1. Создай Issue из шаблона «📚 Прогресс курса»
2. Кликай чекбоксы в Issue (в \`.md\` файлах на GitHub они не кликаются)
3. Action обновит таблицу ниже и закоммитит README

</details>`;
  }

  const issueUrl = `${serverUrl}/${owner}/${repo}/issues/${issue.number}`;
  const { totalChecked, totalAll, weekRows } = parseProgress(issue.body || "");
  const overallRatio = totalAll ? totalChecked / totalAll : 0;
  const overallPct = pct(totalChecked, totalAll);

  const weekTable = weekRows
    .map((w) => {
      const dayCol =
        w.daysTotal > 0 ? `${w.daysDone}/${w.daysTotal} дней` : "—";
      const taskPct = pct(w.checked, w.total);
      return `| ${w.name} | ${dayCol} | ${w.checked}/${w.total} | ${bar(w.total ? w.checked / w.total : 0)} ${taskPct}% |`;
    })
    .join("\n");

  const updated = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

  return `### 📊 Прогресс прохождения

**Общий прогресс:** ${bar(overallRatio, 16)} **${overallPct}%** (${totalChecked}/${totalAll} задач)

👉 **[Issue #${issue.number} — отмечай здесь](${issueUrl})** · обновлено: ${updated}

| Блок | Дни | Задачи | |
|------|-----|--------|---|
${weekTable}

<sub>Авто-синхронизация из Issue · [создать новый трекер](${createUrl})</sub>`;
}

function patchReadme(block) {
  const path = "README.md";
  const readme = readFileSync(path, "utf8");
  const start = readme.indexOf(MARKER_START);
  const end = readme.indexOf(MARKER_END);

  if (start === -1 || end === -1) {
    throw new Error("README.md: markers PROGRESS:START / PROGRESS:END not found");
  }

  const updated =
    readme.slice(0, start + MARKER_START.length) +
    "\n\n" +
    block +
    "\n\n" +
    readme.slice(end);

  writeFileSync(path, updated);
}

async function main() {
  let issues = await github(
    `/repos/${owner}/${repo}/issues?labels=progress&state=open&sort=updated&direction=desc&per_page=5`
  );

  let issue = issues.find((i) => !i.pull_request) || null;

  if (!issue) {
    const all = await github(
      `/repos/${owner}/${repo}/issues?labels=progress&state=all&sort=updated&direction=desc&per_page=5`
    );
    issue = all.find((i) => !i.pull_request) || null;
  }

  console.log(issue ? `Syncing from issue #${issue.number}` : "No open progress issue");
  const block = buildBlock(issue);
  patchReadme(block);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
