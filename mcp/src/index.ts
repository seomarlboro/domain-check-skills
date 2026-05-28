#!/usr/bin/env node
/**
 * Domain Check Skills — MCP server
 * Check domain availability from any LLM. Powered by DigMyName.
 * https://github.com/Seomarlboro/domain-check-skills
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const API_BASE =
  process.env.DIGMYNAME_API_BASE ??
  "https://ifamsapmecefkyspmojb.supabase.co/functions/v1";
const USER_AGENT = "domain-check-skills-mcp/0.1.0 (+https://digmyname.com)";

const POPULAR_TLDS = [
  "com", "io", "ai", "co", "app", "dev",
  "net", "org", "xyz", "tech", "me", "so",
];

async function callApi(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`DigMyName API ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

const server = new Server(
  { name: "domain-check-skills-mcp", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

const CheckSchema = z.object({
  domain: z.string().min(3).describe("Full domain incl. TLD, e.g. 'myidea.com'"),
});
const SearchSchema = z.object({
  name: z.string().min(1).describe("Base name without TLD, e.g. 'myidea'"),
  tlds: z.array(z.string()).optional().describe(`TLDs to check. Default: ${POPULAR_TLDS.join(", ")}`),
});
const RegistrarsSchema = z.object({
  tld: z.string().describe("TLD without dot, e.g. 'com'"),
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "check_domain",
      description:
        "Check live availability for a single domain. Cross-checks Domainr, RDAP, DNS and Porkbun. Returns 'available', 'taken', or 'uncertain' — never guesses.",
      inputSchema: {
        type: "object",
        properties: {
          domain: { type: "string", description: "Full domain, e.g. 'myidea.com'" },
        },
        required: ["domain"],
      },
    },
    {
      name: "search_domains",
      description:
        "Check a base name across multiple TLDs in parallel. Returns availability per TLD.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Base name without TLD" },
          tlds: {
            type: "array",
            items: { type: "string" },
            description: `TLDs to check (default: ${POPULAR_TLDS.join(", ")})`,
          },
        },
        required: ["name"],
      },
    },
    {
      name: "get_registrars",
      description:
        "Compare registration pricing across 7 registrars (Porkbun, Namecheap, Cloudflare, GoDaddy, Spaceship, Dynadot, NameSilo) for a given TLD. Includes 1-year and 3-year totals.",
      inputSchema: {
        type: "object",
        properties: {
          tld: { type: "string", description: "TLD without dot, e.g. 'com'" },
        },
        required: ["tld"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  try {
    switch (req.params.name) {
      case "check_domain": {
        const { domain } = CheckSchema.parse(req.params.arguments);
        const data = await callApi("/check-domain", { domain });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      }
      case "search_domains": {
        const { name, tlds } = SearchSchema.parse(req.params.arguments);
        const list = tlds && tlds.length > 0 ? tlds : POPULAR_TLDS;
        const data = await callApi("/search-domains", { name, tlds: list });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      }
      case "get_registrars": {
        const { tld } = RegistrarsSchema.parse(req.params.arguments);
        const data = await callApi("/get-registrars", { tld });
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      }
      default:
        throw new Error(`Unknown tool: ${req.params.name}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: "text", text: `Error: ${msg}` }],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("[domain-check-skills-mcp] ready");
