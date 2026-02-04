# Ayuluxir Wellness Clinic

Static website for Ayuluxir Wellness Clinic — holistic wellness and Ayurveda.

## GitHub workflow (source of truth)

- **main** branch holds the full site. Push here to keep the repo up to date.
- Your current **live site** on Netlify can stay as-is (manual deploys). This repo is for version control and, when you want it, for connecting Netlify to Git later.
- To put everything on GitHub (first time or after changes):

  ```bash
  git add .
  git status   # check what will be committed
  git commit -m "Describe your changes, e.g. Add full site and Netlify config"
  git push origin main
  ```

- To add only the site and config (ignore the deleted .gitattributes for now):

  ```bash
  git add assets/ README.md .gitignore netlify.toml
  git commit -m "Add site assets and Netlify config"
  git push origin main
  ```

## Structure

- **assets/** — all site files
  - `index.html` — homepage (about, services carousel, contact)
  - `services.html` — full services listing
  - `careers.html` — careers and open roles
  - `footer.html` — shared footer (loaded by index and careers)
  - `style.css` — global styles
  - `script.js` — navigation, carousel, contact form, footer year

## Run locally

Open `assets/index.html` in a browser, or serve the repo with any static server (e.g. `npx serve .` from the project root and visit the `assets` path).

## Share a link with clients (Netlify)

1. **Push your code to GitHub** (if you haven’t already):
   - Create a repo on GitHub, then:
   - `git remote add origin https://github.com/YOUR_USERNAME/ayuluxir-app.git`
   - `git add .` → `git commit -m "Add site"` → `git push -u origin main`

2. **Connect to Netlify:**
   - Go to [netlify.com](https://www.netlify.com) and sign in (or create an account).
   - Click **“Add new site”** → **“Import an existing project”**.
   - Choose **GitHub** and authorize Netlify, then select your `ayuluxir-app` repository.

3. **Build settings:**
   - **Branch to deploy:** `main` (or your default branch).
   - **Publish directory:** `assets` (this is already set in `netlify.toml` in the repo).
   - Click **“Deploy site”**.

4. **Get your link:**
   - After the deploy finishes, Netlify gives you a URL like `https://random-name-12345.netlify.app`.
   - Share that link with clients so they can view the site before you point a custom domain.

**Optional:** In **Site settings → Domain management**, you can change the subdomain (e.g. `ayuluxir-preview.netlify.app`) or add a custom domain later.

## Form

The contact form on the homepage uses `action="#"` by default. To enable submissions, set the form `action` to your Formspree (or other) endpoint, e.g. `https://formspree.io/f/xxxxx`.

## Social / contact

Replace `YOUR_HANDLE` in social links and any placeholder URLs with your real handles and URLs.
