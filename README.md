# DigMyName MCP Server & Skill

> 🇺🇦 **Built in Ukraine.** [Stand with Ukraine](https://u24.gov.ua/) — support the army and humanitarian aid via United24.

A free MCP (Model Context Protocol) server and Claude Skill for checking domain availability across 50+ TLDs, with cheapest-registrar pricing baked in.

Powered by [digmyname.com](https://digmyname.com) — a multi-source verification engine (Domainr + RDAP + DNS + Porkbun) that never reports uncertain results as "taken".

---

## What you get

- ✅ **Domain availability** across 50+ TLDs (`.com`, `.io`, `.ai`, `.app`, `.dev`, `.co`, …)
- ✅ **Cheapest registrar** per TLD (7 registrars compared: Cloudflare, Porkbun, Namecheap, Spaceship, OVHcloud, GoDaddy, Google Domains)
- ✅ **Premium / for-sale detection** (GoDaddy aftermarket + parked-domain heuristics)
- ✅ **No API key required** — free public endpoint
- ✅ **Works in Claude Desktop, Cursor, Windsurf, ChatGPT Apps, n8n, any MCP-compatible client**

---

## Install

### Claude Desktop / Cursor / Windsurf (MCP)

Add to your MCP config (`~/Library/Application Support/Claude/claude_desktop_config.json` or equivalent):

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

Restart your client. Ask: *"Is `mybakery.com` available?"*

### Direct HTTP (no install)

```bash
curl "https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api/check?domain=mybakery.com"
```

### Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /check?domain=<fqdn>` | Single domain |
| `GET /search?q=<word>&tlds=com,io,ai` | One name × many TLDs |
| `GET /registrars?tld=<tld>` | Cheapest registrars for a TLD |
| `GET /openapi.json` | OpenAPI 3.1 spec |

Base URL: `https://ifamsapmecefkyspmojb.supabase.co/functions/v1/public-api`

---

## Limits & Fair Use

The free tier is intentionally generous so hobbyists, AI agents, and small scripts can run without friction:

| Limit | Value |
|---|---|
| Requests / minute / IP | **60** |
| Requests / day / IP | **5,000** |
| Domains per `/search` call | 12 TLDs |
| Response timeout | 10s |
| Auth | None |

Rate limits are per edge instance and best-effort. If you exceed them you'll get `429` with `Retry-After`.

**Need more?** A paid tier with API keys, higher limits, SLAs, and webhook notifications is coming. [Join the waitlist →](https://digmyname.com/mcp)

---

## Why MCP instead of a custom API?

Because in 2026 your users don't `curl`. They ask Claude, Cursor, or ChatGPT. MCP is the lingua franca — write the tool once, every assistant on the planet can call it.

This skill turns DigMyName into a first-class tool for any LLM agent: name brainstorming, bulk checks, registrar comparison, all without context-switching to a browser.

---

## Roadmap

- [ ] Publish to npm as `domain-check-skills-mcp`
- [ ] Claude Desktop one-click installer (`.dxt` bundle)
- [ ] VS Code / Cursor extension
- [ ] More registrars (Hover, Gandi, Internet.bs, Dynadot)
- [ ] WHOIS history lookups (recently-expired domain hunter)
- [ ] Bulk CSV check via MCP resource
- [ ] Webhook: notify when a watched domain drops
- [ ] Usage examples in 6 languages (EN / DE / ES / FR / 🇺🇦 UK / 中文)
- [ ] Paid tier: API keys, 100k/day, webhooks, SLA

PRs welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

MIT © DigMyName contributors

🇺🇦 No russian. Slava Ukraini.
