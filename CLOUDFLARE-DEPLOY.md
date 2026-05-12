# CoastSlide Cloudflare Deployment Notes

## Recommended deployment path

Use Cloudflare Pages with GitHub or GitLab integration.

1. Put the `CoastSlide` folder in a Git repository.
2. In Cloudflare, create a Pages project connected to that repository.
3. Use these build settings:
   - Framework preset: None
   - Build command: empty
   - Build output directory: `/` if the repository root is the site folder, or `CoastSlide` if the repository contains this folder.
4. Add the custom domain `coastsliding.com`.
5. Submit `https://coastsliding.com/sitemap.xml` in Google Search Console.

Cloudflare Pages will use:

- `_headers` for cache/security headers.
- `_redirects` for simple redirects.
- `robots.txt` for crawler access.
- `sitemap.xml` for Google/Bing submission.

## Codex direct-update workflow

The best way for Codex to update the live site without manual uploads is:

1. Connect the site to a GitHub repository.
2. Connect Cloudflare Pages to that same repository.
3. Let Codex edit the repository and commit changes.
4. Cloudflare automatically deploys every push.

This gives version history, rollback, preview deployments, and no manual ZIP uploads.

## Direct upload alternative

Cloudflare Pages also supports direct upload with Wrangler:

```bash
npx wrangler pages deploy CoastSlide --project-name=coastsliding
```

This requires a Cloudflare API token and account/project access. Git integration is recommended because it is safer and easier to automate.

## Blog automation

Automated blog publishing is possible, but should be done carefully:

- Use a content calendar.
- Generate drafts first.
- Review factual/local claims before publishing.
- Commit approved posts to Git.
- Let Cloudflare auto-deploy from Git.

Publishing low-quality automated content can hurt SEO. The safer automation is weekly or biweekly high-quality drafts with human approval.
