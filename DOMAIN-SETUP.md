# Connecting thalosconstruction.com to the live site

The site is live at https://xrpthegoat.github.io/thalos-construction/.
This guide moves it onto **thalosconstruction.com** (registered Jan 2025 via
Squarespace Domains — Steven's account).

> ⚠️ **EMAIL SAFETY — read first.** This domain runs Steven's business email
> (Microsoft 365 — the MX record points at `thalosconstruction-com.mail.protection.outlook.com`).
> Only ADD/CHANGE the records listed below. **Never delete or edit MX, TXT,
> SRV, or CNAME records mentioning `outlook`, `autodiscover`, `microsoft`, or
> `_dmarc`/`spf`.** Touch those and his email goes down.

## Step 1 — Steven logs into Squarespace

account.squarespace.com → Domains → `thalosconstruction.com` → **DNS settings**.
(If he forgot the login: "Forgot password" with his business email.)

## Step 2 — Remove the old website records only

Delete ONLY records that point the WEBSITE at Squarespace's dead site:
- Any **A** record with values like `198.185.159.144`, `198.185.159.145`,
  `198.49.23.144`, `198.49.23.145`
- Any **CNAME** for host `www` pointing to `ext-cust.squarespace.com` or similar

(Leave every MX/TXT/autodiscover record alone — see the warning above.)

## Step 3 — Add the GitHub Pages records

| Type  | Host | Value                |
|-------|------|----------------------|
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | xrpthegoat.github.io |

## Step 4 — Tell Claude/Jhonatan "DNS is done"

The final switch happens on the GitHub side (custom domain + HTTPS
certificate). Command for reference:

```
gh api -X PUT repos/xrpthegoat/thalos-construction/pages \
  -f cname=thalosconstruction.com
```

Then in repo Settings → Pages, tick **Enforce HTTPS** once the certificate
is issued (can take up to an hour after DNS propagates).

Result: https://thalosconstruction.com serves the site, https://www.thalosconstruction.com
redirects to it, email keeps working, total new cost: $0 (the domain's normal
~$20/yr renewal at Squarespace is the only recurring cost).

## Don't do this until DNS is changed

Setting the custom domain on GitHub **before** the DNS records exist redirects
the working github.io URL to a dead domain. DNS first, GitHub switch second.
