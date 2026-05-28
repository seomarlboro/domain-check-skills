# Contributing

Thanks for considering a contribution! Domain Check Skills is intentionally small — the goal is *reliable* domain availability for LLMs, not a kitchen sink.

## Ways to help

- **Port the MCP server to Python** (`/mcp-python`) — same tool schemas, same backend.
- **Cloudflare Workers template** — single-file deployment for the MCP server.
- **Test on new MCP clients** — open an issue with screenshots if it works (or doesn't) on Zed, Continue, etc.
- **Translations** — README + skill description in DE/ES/RU/JP/CN.
- **More registrars** — add Hover, Gandi, Internet.bs to `get_registrars`.
- **Custom GPT examples** — share prompts that work well; we'll add the best to `/gpt/examples/`.

## Dev loop (MCP)

```bash
cd mcp
npm install
npm run dev     # watches src/index.ts
```

Test against Claude Desktop by pointing your config at the local build:

```json
{
  "mcpServers": {
    "domain-check-skills": {
      "command": "node",
      "args": ["/absolute/path/to/mcp/dist/index.js"]
    }
  }
}
```

## PR checklist

- [ ] No new runtime deps unless absolutely needed (keep `npx` cold-start fast)
- [ ] Tool schemas updated if you change inputs/outputs
- [ ] README updated if you add a tool
- [ ] Tested against at least one MCP client

## Code of conduct

Be kind. Assume good faith. We're all just trying to find a `.com`.
