//! MONOREPO — Nx, Turborepo

//! Зачем: shared packages, единый CI, atomic changes across apps
// apps/web, apps/admin, packages/ui, packages/shared-types

//! Turborepo — task pipeline, remote caching
// turbo.json: build depends on ^build (dependencies first)
// turbo run build --filter=web

//! Nx — более мощный: affected commands, dependency graph, generators
// nx affected:build — только изменённые projects

//! Shared packages:
// @company/ui — design system
// @company/api-client — typed API layer
// @company/config-eslint — shared lint config

//! Senior: микрофронтенды vs monorepo?
// Monorepo — один deploy unit, shared deps, проще refactor
// Microfrontends — independent deploy, Module Federation, больше complexity

export {};
