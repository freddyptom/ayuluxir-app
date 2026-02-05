# SEO guide for Ayuluxir website

This document explains what’s already in place and what you should do to get the most from SEO.

---

## What’s already implemented

- **Unique `<title>` and `<meta name="description">`** on every page (home, services, careers).
- **Canonical URLs** so search engines know the main URL for each page (no duplicate-content confusion).
- **Open Graph (og:)** tags so links look good when shared on Facebook, LinkedIn, etc.
- **Twitter Card** tags so links show a nice preview on Twitter/X.
- **One `<h1>` per page** (homepage has a visually hidden “Ayuluxir Wellness Clinic” in the hero; services and careers already have clear h1s).
- **`robots` meta** set to `index, follow` so pages are eligible to be indexed.

All canonical and OG URLs use the placeholder domain **`https://www.ayuluxir.com`**. You must replace this with your real live URL.

---

## What you need to do

### 1. Use your real domain in meta tags

When you have your live site URL (e.g. `https://www.ayuluxir.com` or your Netlify URL):

- **Find and replace** in the repo:
  - Search for: `https://www.ayuluxir.com`
  - Replace with: your actual URL (with no trailing slash for the homepage, e.g. `https://www.ayuluxir.com`).
- Do this in:
  - `assets/index.html` (canonical, og:url, og:image, twitter)
  - `assets/services.html` (canonical, og:url, og:image, twitter)
  - `assets/careers.html` (canonical, og:url, og:image, twitter)

If your logo image path is different (e.g. different filename or folder), update the `og:image` and Twitter image URLs in those same files.

---

### 2. Add a sitemap

- Create a **sitemap** that lists your main pages so search engines can discover them quickly.
- **Option A – Static file:** Create `assets/sitemap.xml` with your real domain and the paths:
  - `/` (or `/index.html` if that’s how the site is served)
  - `/services.html`
  - `/careers.html`
- **Option B – Netlify:** Use a Netlify plugin or build step to generate `sitemap.xml` from your site structure.
- Submit the sitemap in **Google Search Console** (see below).

---

### 3. Submit the site to search engines

- **Google**
  - Go to [Google Search Console](https://search.google.com/search-console).
  - Add your property (your live URL).
  - Verify ownership (HTML file, DNS, or meta tag).
  - Submit your sitemap URL (e.g. `https://www.ayuluxir.com/sitemap.xml`).
- **Bing**
  - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
  - Add your site and submit the same sitemap.

---

### 4. Improve images for SEO (optional but recommended)

- **Alt text:** All important images should have an `alt` attribute. Check hero images, service images, and logos; add or improve `alt` to describe the image (e.g. “Ayuluxir signature massage treatment”).
- **File names:** Use descriptive, short names (e.g. `ayuluxir-signature-massage.jpg` instead of only `image.png`) where possible.
- **Size:** Compress images so pages load quickly; fast pages tend to rank better.

---

### 5. Optional: structured data (JSON-LD)

For local businesses, **LocalBusiness** or **HealthAndBeautyBusiness** schema can help Google show your address, phone, and opening hours in search.

- Add a `<script type="application/ld+json">` block in the `<head>` or before `</body>` of `index.html` with your business name, URL, address, phone, and (if you have them) opening hours.
- Validate the markup with [Google’s Rich Results Test](https://search.google.com/test/rich-results).

---

### 6. Content and keywords

- **Descriptions:** The current meta descriptions are generic. When you finalise your offer, tweak them to include your main services and location (e.g. “Birmingham”) and a clear call to action if it fits (e.g. “Book a consultation”).
- **Headings:** Keep a clear hierarchy: one `<h1>` per page, then `<h2>`, `<h3>` for sections. Services and careers pages already follow this.
- **Internal links:** The nav already links between home, services, and careers. Keep these so crawlers and users can move between key pages easily.

---

### 7. After you go live

- In Search Console, check **Coverage** and **Core Web Vitals**.
- Fix any reported errors (e.g. broken links, missing pages).
- If you change your domain, set up **301 redirects** from the old URL to the new one and update canonicals and OG URLs to the new domain.

---

## Quick checklist

| Task | Done |
|------|------|
| Replace `https://www.ayuluxir.com` with your real URL in all HTML files | ☐ |
| Add/update `og:image` if your logo or default share image path changes | ☐ |
| Create and host `sitemap.xml` | ☐ |
| Add site to Google Search Console and submit sitemap | ☐ |
| Add site to Bing Webmaster Tools and submit sitemap | ☐ |
| Review and improve image `alt` text | ☐ |
| (Optional) Add LocalBusiness JSON-LD on homepage | ☐ |

Once the domain is correct and the sitemap is submitted, the foundation for SEO is in place; the rest is content, performance, and monitoring in Search Console.
