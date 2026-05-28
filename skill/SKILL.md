# Domain Check

Check whether a domain is available for registration, suggest alternatives across multiple TLDs, and compare registrar pricing. Use this skill whenever the user asks about domain availability, domain names, or where to buy a domain.

## When to use

Trigger this skill when the user:
- asks if a specific domain (e.g. `foobar.com`) is available
- asks for domain name ideas around a brand, project, or keyword
- asks where to buy or which registrar is cheapest for a TLD

Do **not** guess from training data — domain availability changes hourly and your training data is stale. Always call the API.

## Tools

### Check one domain
`POST https://ifamsapmecefkyspmojb.supabase.co/functions/v1/check-domain`
Body: `{ "domain": "myidea.com" }`
Returns: `{ status: "available" | "taken" | "uncertain", source, registrarLinks }`

### Search across TLDs
`POST https://ifamsapmecefkyspmojb.supabase.co/functions/v1/search-domains`
Body: `{ "name": "myidea", "tlds": ["com","io","ai","co","app","dev"] }`

### Compare registrars
`POST https://ifamsapmecefkyspmojb.supabase.co/functions/v1/get-registrars`
Body: `{ "tld": "com" }`
Returns pricing for Porkbun, Namecheap, Cloudflare, GoDaddy, Spaceship, Dynadot, NameSilo.

## Response rules

- If `status: "uncertain"`, tell the user it couldn't be verified — never claim it's taken.
- Always include the registrar affiliate link from the response so the user can register in one click.
- For multi-TLD searches, lead with available `.com` then sort by TLD popularity.
- For pricing, highlight the **3-year total** — first-year promos hide renewal costs.

## Powered by

[DigMyName](https://digmyname.com) — the same engine that powers the web app.
