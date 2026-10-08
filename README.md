# Gagandeep Singh — Portfolio

A responsive, static portfolio emphasizing software development for payments and loan calculations in loan servicing. Built with HTML, CSS, and JavaScript; no install, build step, API token, or backend is required.

## Local preview

From this directory, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl+C.

## Content updates

- **Professional copy and contact:** edit `index.html`. The first version uses general professional descriptions and GitHub contact links. Add employer details, accomplishments, email, or LinkedIn only when ready to make them public.
- **Featured projects:** edit the three project cards in `index.html`. Their copy is based on public project READMEs, rather than inferred accomplishments. The visual panels are decorative illustrations, not application screenshots.
- **Saved collection:** edit the `repository-list` articles in `index.html`. This list is visible immediately, with JavaScript disabled, and whenever the GitHub refresh fails.
- **Live collection:** `script.js` fetches public repositories owned by `gagan151`, including forks and archived repositories, and follows pagination. The website repositories `Portfolio-Website` and `gagan151.github.io` are excluded from display using the case-insensitive `excludedRepositories` set. Update `account`, `descriptions`, and `featuredOrder` there if needed; also update the saved links and contact links in HTML when changing accounts. New public repositories appear automatically with GitHub metadata unless excluded. Featured cards remain curated.
- **Appearance:** edit the colors and layout in `styles.css`; the site icon is `favicon.svg`.

The refresh has a 12-second timeout. Errors, rate limits, and malformed or incomplete paginated responses retain the saved HTML collection. GitHub's unauthenticated API rate limit applies; no secret belongs in this site's client code. API text is rendered as text, and project website links accept only HTTP or HTTPS URLs.

## GitHub Pages

After reviewing the site, commit these files and push to `main` in `gagan151/Portfolio-Website`.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Wait for the Pages deployment to finish; the expected address is https://gagan151.github.io/Portfolio-Website/.

Asset paths are relative, so the site works under the repository subdirectory. No custom domain or GitHub Actions workflow is required. The separate `gagan151.github.io` repository redirects `https://gagan151.github.io/` to this portfolio, so updates here are also visible to visitors arriving at the root address.

## Verification

Check desktop and narrow mobile layouts, keyboard navigation and focus, internal navigation, repository links, and reduced-motion behavior. Disable JavaScript to check the saved collection. Block `api.github.com` to check failure handling; restore access to confirm the live list. Test pagination and invalid API responses with mocked requests before changing integration behavior.
