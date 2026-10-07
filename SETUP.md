# Setup Checklist

This project is delivered in stages so beginners can see the site before cloud setup.

## 1. Local Preview

- Build locally with `node scripts/site.js build --cwd <project>`.
- Start preview with `node scripts/site.js preview:start --cwd <project> --mode vite`.
- Keep the preview running until a public URL is verified.

**Testing the application form locally:** `vite dev` (and the preview above) have no
`/api/apply` route — submitting there returns a 404 and the form shows an error. That is
expected. To exercise the real endpoint locally, run `vercel dev` in the project root, which
serves both the Vite site and the serverless function.

## 2. Supabase Activation

Use this only when the site needs real products, inventory, orders, auth, or user-owned data.

The agent first checks product authorization:

```bash
accio-mcp-cli server supabase
```

If Supabase is not connected, open Accio, go to the Accio Site Builder plugin, connect Supabase, and finish authorization. If connected, the Agent should run `accio-mcp-cli search supabase` to query tool usage, then use Supabase MCP tools such as `get_project_url`, `get_publishable_keys`, `list_tables`, `list_migrations`, `apply_migration`, `execute_sql`, `generate_typescript_types`, `deploy_edge_function`, `get_logs`, and `get_advisors`.

Never paste `SUPABASE_SERVICE_ROLE_KEY`, database passwords, connection strings, or account access tokens in chat.

### Migrations to run (SQL Editor → New query → paste → Run)

Run in order; each file is safe to run more than once:

1. `supabase/migrations/0001_applications.sql` — the `applications` table + public INSERT policy
2. `supabase/migrations/0002_admin.sql` — `site_settings`, `admin_activity`, admin RLS
3. `supabase/migrations/0003_chat_contacts.sql` — `chat_contacts` (WhatsApp/Telegram list)
4. `supabase/migrations/0004_chat_round_robin.sql` — round-robin assignment (default off)

## 3. Commerce Requests

This plugin does not generate online payment, cart, checkout, or payment placeholder flows. For commerce-shaped sites, use product/service display, inquiry forms, booking requests, or off-site contact links.

## 4. Site Publish

Two equivalent ways to get a public URL:

- The user clicks the product UI publish button.
- When host builtin `web_builder_publish` is visible/available, the agent asks for explicit consent, then publishes and reports the public URL.

Keep the local preview running until the public URL is verified.

Company-domain subdomains from site publish are supported. Binding a user's own domain is not supported yet. If asked to bind their own domain, do not guide DNS/CNAME setup; say that feature is in development and coming later.

## 5. Vercel environment variables

Set these in Vercel → Project → Settings → Environment Variables (Production + Preview):

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | yes | the public site reads settings/chat contacts |
| `VITE_SUPABASE_ANON_KEY` | yes | same — the anon key; RLS protects the data |
| `SUPABASE_URL` | yes* | `/api/apply` saves applications (*or `VITE_SUPABASE_URL`) |
| `SUPABASE_ANON_KEY` | yes* | same for the server function (*or the `VITE_` version) |
| `RESEND_API_KEY` | for email | application emails; without it rows are still saved |
| `RESEND_FROM` | no | sender address, default `onboarding@resend.dev` |
| `NOTIFY_EMAIL` | no | where applications are emailed; the admin's `notification_email` setting wins over this |

Never put the service-role key in Vercel or in the repo — the site only ever needs the anon key.

### Why "We could not submit your application" happens when the internet is fine

1. **Missing Vercel env vars** — `GET /api/apply?health=1` on the deployed site returns
   `{ supabaseConfigured, resendConfigured, notifyEmailSource }` (booleans only). If
   `supabaseConfigured` is false, the function cannot save and every submit fails.
2. **Tables not created** — run the four migrations above; the insert fails without
   `applications`.
3. **Vercel Deployment Protection on preview URLs** (e.g. `...-iamdevise1.vercel.app`):
   protected deployments answer `/api/*` with a 401 HTML page, which the form treats as a
   failure. Fix: disable Deployment Protection for the project (Settings → Deployment
   Protection) or test on the production domain. The code cannot work around this.
4. **`vite dev` / preview only** — `/api/apply` does not exist there (404). Use `vercel dev`.

### Resend email note

The default sender `onboarding@resend.dev` only delivers to the email address that owns the
Resend account. For `polystaradmin@gmail.com` to actually receive applications, either:

- register the Resend account with exactly `polystaradmin@gmail.com`, **or**
- verify a domain in Resend and set `RESEND_FROM` to an address on that domain.

`RESEND_FROM` is optional and defaults to `onboarding@resend.dev`. The recipient comes from
the admin's `notification_email` setting, then `NOTIFY_EMAIL`, then the built-in default.

## Completion

Final handoff should include either a public URL, a still-running local preview URL, or a blocker plus the exact next action. Format a local preview URL according to `skills/react-local-runtime/SKILL.md` so its link text matches the user's current conversation language and has no preceding label.
