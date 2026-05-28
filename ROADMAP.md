# Roadmap

Replaces the previous roadmap (Python port, Cloudflare Workers template, and generic "translations" are dropped — they were carry-cult items, not user requests).

## Near term

- [ ] **Publish to npm** as `domain-check-skills-mcp` — one-line install via `npx`.
- [ ] **Claude Desktop `.dxt` bundle** — one-click installer, no JSON editing.
- [ ] **VS Code / Cursor extension** — install from Marketplace, no MCP config.
- [ ] **Multi-language usage examples** in README — EN / DE / ES / FR / 🇺🇦 UK / 中文. (Skill description itself stays in English: LLMs route tools better in English; agents translate user prompts and answers automatically.)

## Mid term

- [ ] **More registrars** — Hover, Gandi, Internet.bs, Dynadot.
- [ ] **WHOIS history lookups** — surface recently-expired domains (drop-catching).
- [ ] **Bulk CSV check** via MCP resource — upload a list, get a CSV back.
- [ ] **Webhook drop alerts** — notify when a watched domain frees up.

## Paid tier (validating demand via waitlist)

- [ ] API keys + per-key quotas.
- [ ] 100,000 req/day, 600 req/min.
- [ ] Webhooks for availability changes.
- [ ] SLA + priority support.

## Explicitly NOT doing

- ❌ Python port — MCP servers are Node/TS-native; Python adds no value here.
- ❌ Cloudflare Workers template — backend already runs on Deno (Supabase Edge Functions), which IS the Workers runtime. Nothing to port.
- ❌ Full UI translations of the skill repo — README in English is fine for developers; the website is where end-user i18n matters.

PRs welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).
