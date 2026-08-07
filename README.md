# DigMyName MCP Server & Skill

> 🇺🇦 **Built in Ukraine.** [Stand with Ukraine](https://u24.gov.ua/) — support the army and humanitarian aid via United24.

A free **MCP (Model Context Protocol) server** and **Claude Skill** for checking domain availability across 50+ TLDs, with cheapest-registrar pricing baked in.

Powered by [digmyname.com](https://digmyname.com) — a multi-source verification engine (RDAP + DNS-over-HTTPS + Fastly Domain Research, with Porkbun for pricing) that **never reports uncertain results as "taken"**.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-purple.svg)](https://modelcontextprotocol.io)
[![Free Tier](https://img.shields.io/badge/free-no%20API%20key-green.svg)](#limits--fair-use)

---

## Table of Contents

- [What you get](#what-you-get)
- [Quick start (60 seconds)](#quick-start-60-seconds)
- [Install per client](#install-per-client)
  - [Claude Desktop](#claude-desktop)
  - [Cursor](#cursor)
  - [Windsurf](#windsurf)
  - [ChatGPT Apps / Custom GPTs](#chatgpt-apps--custom-gpts)
  - [n8n](#n8n)
  - [Direct HTTP / curl](#direct-http--curl)
- [API reference](#api-reference)
- [Example prompts](#example-prompts)
- [Response format](#response-format)
- [Limits & fair use](#limits--fair-use)
- [Troubleshooting](#troubleshooting)
- [Why MCP?](#why-mcp-instead-of-a-custom-api)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## What you get

- ✅ **Domain availability** across 50+ TLDs (`.com`, `.io`, `.ai`, `.app`, `.dev`, `.co`, `.xyz`, `.me`, `.so`, …)
- ✅ **Cheapest registrar** per TLD — 6 registrars compared (Cloudflare, Porkbun, Namecheap, Spaceship, OVHcloud, GoDaddy)
- ✅ **Premium / for-sale detection** (GoDaddy aftermarket + parked-domain heuristics)
- ✅ **Multi-source verification** — RDAP (IANA bootstrap) + DNS-over-HTTPS (hedged) + Fastly Domain Research. Porkbun used for pricing only. Uncertain ≠ taken.
- ✅ **No API key required** — free public endpoint
- ✅ **Works in Claude Desktop, Cursor, Windsurf, ChatGPT, n8n, Zed**, and any MCP-compatible client

---

## Quick start (60 seconds)

```bash
# 1. Test it works (no install)
curl "https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/check?domain=mybakery.com"

# 2. Add to Claude Desktop config (see below)
# 3. Restart Claude → ask "Is mybakery.com available?"
```

---

## Install per client

### Claude Desktop

**1.** Open the config file:

| OS | Path |
|---|---|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

**2.** Add the `digmyname` entry (merge with your existing `mcpServers` if you already have one):

```json
{
  "mcpServers": {
    "digmyname": {
      "command": "npx",
      "args": ["-y", "domain-check-skills-mcp"]
    }
  }
}
```

**3.** Fully quit Claude Desktop (⌘Q / Alt+F4 — closing the window is not enough) and reopen it.

**4.** Click the 🔌 plug icon in the composer → you should see `digmyname` listed with 3 tools.

**5.** Try it: *"Is `mybakery.com` available? If not, suggest 5 alternatives across .com, .io, .ai."*

### Cursor

**Settings → MCP → Add new MCP server** → paste:

```json
{
  "digmyname": {
    "command": "npx",
    "args": ["-y", "domain-check-skills-mcp"]
  }
}
```

Reload window. The tools appear in Composer (⌘I).

### Windsurf

**Settings → Cascade → Model Context Protocol** → use the same config as Cursor above.

### ChatGPT Apps / Custom GPTs

ChatGPT supports MCP via the **Actions** mechanism. Import the OpenAPI spec directly:

```
https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/openapi.json
```

In your Custom GPT: **Configure → Actions → Import from URL** → paste the URL above. Auth: **None**.

### n8n

Use the **HTTP Request** node:

- Method: `GET`
- URL: `https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/check`
- Query: `domain={{ $json.domain }}`

Or install the community MCP node and point it at `npx domain-check-skills-mcp`.

### Direct HTTP / curl

No install, no auth, just `curl`:

```bash
# Single domain
curl "https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/check?domain=mybakery.com"

# One name across multiple TLDs
curl "https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/search?q=mybakery&tlds=com,io,ai,app"

# Cheapest registrars for a TLD
curl "https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/registrars?tld=ai"
```

---

## API reference

**Base URL:** `https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api`

| Endpoint | Params | Purpose |
|---|---|---|
| `GET /check` | `domain=<fqdn>` | Check one fully-qualified domain |
| `GET /search` | `q=<word>`, `tlds=com,io,ai` (≤12) | Same name across many TLDs |
| `GET /registrars` | `tld=<tld>` | Cheapest registrars for a TLD (1y / 3y) |
| `GET /openapi.json` | — | OpenAPI 3.1 spec (for ChatGPT Actions, Postman, etc.) |

---

## Example prompts

Once installed, try these in Claude / Cursor / Windsurf:

> "Is **mybakery.com** available? If yes, where's it cheapest?"

> "I'm launching an AI tool called **Lumen**. Check `lumen` across `.com`, `.io`, `.ai`, `.app`, `.dev`, `.so`, `.xyz`. Show me only the available ones, sorted by price."

> "Compare the 3-year cost of registering a **.ai** domain across all registrars you know."

> "Brainstorm 10 brandable 2-word names for a fintech startup, then check `.com` availability for each."

> "I have a list of 20 domain ideas in this CSV — check them all and tell me which are available."

---

## Response format

```json
{
  "domain": "mybakery.com",
  "available": true,
  "confidence": "high",
  "sources": ["rdap", "dns", "fastly"],
  "premium": false,
  "cheapest": {
    "registrar": "Cloudflare",
    "price_usd": 10.44,
    "renewal_usd": 10.44,
    "url": "https://www.cloudflare.com/products/registrar/"
  },
  "all_registrars": [
    { "name": "Cloudflare", "price_usd": 10.44, "renewal_usd": 10.44 },
    { "name": "Porkbun",    "price_usd": 11.06, "renewal_usd": 11.06 },
    { "name": "Namecheap",  "price_usd": 11.28, "renewal_usd": 15.88 }
  ]
}
```

When availability cannot be verified with confidence, `available` is `null` and `confidence` is `"low"` — **never** silently reported as taken.

---

## Limits & fair use

The free tier is intentionally generous so hobbyists, AI agents, and small scripts can run without friction:

| Limit | Value |
|---|---|
| Requests / minute / IP | **60** |
| Requests / day / IP | **5,000** |
| TLDs per `/search` call | **12** |
| Response timeout | **10s** |
| Auth | None |

Rate limits are per edge instance and best-effort. If you exceed them you'll get `HTTP 429` with a `Retry-After` header.

**Need more?** A paid tier with API keys, 100k req/day, SLAs, and webhook notifications is on the way. [Join the waitlist →](https://digmyname.com/mcp)

---

## Troubleshooting

**`digmyname` doesn't appear in Claude after install**
→ Make sure you **fully quit** Claude (⌘Q on Mac, not just close window). Then check Settings → Developer → MCP Servers for error logs.

**`npx: command not found`**
→ Install Node.js 18+ from [nodejs.org](https://nodejs.org). Then `node --version` and `npx --version` should both work.

**`Error: spawn npx ENOENT` (Windows)**
→ Use the full path: `"command": "C:\\Program Files\\nodejs\\npx.cmd"`.

**Getting `429 Too Many Requests`**
→ You hit 60/min or 5,000/day. Wait or [join the paid waitlist](https://digmyname.com/mcp).

**Domain shows `available: null`**
→ One of our sources is unreachable for that TLD. Re-run in 30s, or check manually on digmyname.com. We **never** report uncertain as taken.

**Still stuck?** Open an [issue](https://github.com/seomarlboro/domain-check-skills/issues) with the exact prompt + client + OS.

---

## Why MCP instead of a custom API?

Because in 2026 your users don't `curl`. They ask Claude, Cursor, or ChatGPT.

MCP is the **lingua franca** — write the tool once, every assistant on the planet can call it. This skill turns DigMyName into a first-class tool for any LLM agent: name brainstorming, bulk checks, registrar comparison, all without context-switching to a browser.

---

## Roadmap

- [ ] Publish to npm as `domain-check-skills-mcp`
- [ ] Claude Desktop one-click installer (`.dxt` bundle)
- [ ] VS Code / Cursor / Zed extensions
- [ ] Python port of the MCP server
- [ ] Cloudflare Workers deployment template
- [ ] More registrars (Hover, Gandi, Internet.bs, Dynadot)
- [ ] WHOIS history lookups (recently-expired domain hunter)
- [ ] Bulk CSV check via MCP resource
- [ ] Webhook: notify when a watched domain drops
- [ ] Localized usage examples (EN / DE / ES / FR / 🇺🇦 UK / 中文)
- [ ] Paid tier: API keys, 100k/day, webhooks, SLA

PRs welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Contributing

1. Fork, branch from `main`
2. `npm install && npm test`
3. Open a PR with a clear description + tests for new behavior

Bug reports and feature requests: [GitHub Issues](https://github.com/seomarlboro/domain-check-skills/issues).

---

## License

MIT © DigMyName contributors

---

🇺🇦 **No russian. Slava Ukraini.**
