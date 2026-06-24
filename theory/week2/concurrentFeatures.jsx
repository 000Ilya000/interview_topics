import { Suspense, useTransition, useDeferredValue, useState } from "react";

//! SUSPENSE — fallback пока lazy component / async data loading
// const LazyPage = React.lazy(() => import("./Page"));
// <Suspense fallback={<Spinner />}><LazyPage /></Suspense>

//! useTransition — пометить state update как non-urgent
function SearchList({ items }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // urgent — input responsive
    startTransition(() => {
      setQuery(value); // можно фильтровать тяжёлый список здесь
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Loading...</span>}
    </>
  );
}

//! useDeferredValue — отложить обновление value для тяжёлого UI
function DeferredSearch({ query, items }) {
  const deferredQuery = useDeferredValue(query);
  const filtered = items.filter((i) => i.includes(deferredQuery));
  return <ul>{filtered.map((i) => <li key={i}>{i}</li>)}</ul>;
}

export { SearchList, DeferredSearch };
