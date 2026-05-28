# domain-check-skills-mcp

MCP server to check domain availability from any LLM client — Claude Desktop, Cursor, Windsurf, Continue, Zed.

## Install

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "domain-check-skills": {
      "command": "npx",
      "args": ["-y", "domain-check-skills-mcp"]
    }
  }
}
```

Restart Claude. You'll see the tools listed under the 🔌 icon.

### Cursor

Settings → MCP → Add new MCP server:

```json
{
  "command": "npx",
  "args": ["-y", "domain-check-skills-mcp"]
}
```

### Windsurf / Continue / Zed

Same config shape — point the command at `npx -y domain-check-skills-mcp`.

## Tools

- `check_domain(domain)` — single domain, live cross-checked
- `search_domains(name, tlds?)` — base name × multiple TLDs in parallel
- `get_registrars(tld)` — pricing across 7 registrars

## Local development

```bash
git clone https://github.com/Seomarlboro/domain-check-skills.git
cd domain-check-skills/mcp
npm install
npm run build
```

Point your client at the local build:

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

## Release

```bash
npm version patch
npm publish
```

## About

Built and maintained by **[DigMyName](https://digmyname.com)** — free domain search engine, no signup.

MIT licensed.
