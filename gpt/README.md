# Custom GPT: Domain Check Skills

Build a ChatGPT Custom GPT that checks live domain availability via the DigMyName API.

## Setup

1. ChatGPT → Explore GPTs → **Create**
2. **Name**: `Domain Check Skills`
3. **Description**: `Check live domain availability across 52 TLDs and compare 7 registrars. No more hallucinated domains.`
4. **Instructions**: paste [`instructions.md`](./instructions.md)
5. **Actions** → Import from URL → paste contents of [`openapi.yaml`](./openapi.yaml)
6. **Conversation starters**:
   - *Is `myidea.com` available?*
   - *Suggest domain names for a fintech startup*
   - *Cheapest registrar for `.dev` over 3 years*
7. **Knowledge**: optional — upload [`../skill/SKILL.md`](../skill/SKILL.md) for extra context

## Powered by

[DigMyName](https://digmyname.com) — free, no signup. MIT licensed.
