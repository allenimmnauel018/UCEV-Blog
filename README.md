# UCEV Blog

## Overview

This repository contains the official website for **University College of Engineering Villupuram (UCEV)**. It provides information about the college, departments, contact details, and a blog/news section. The site is built using HTML, CSS, and JavaScript with a focus on responsiveness, accessibility, and usability.

---

## Features

* **Responsive Design** — Works on desktop, tablet, and mobile.
* **Dynamic Content Loading** — Departments and posts are fetched from JSON files.
* **Blog & News Section** — Search and filter by department.
* **Contact Form** — Inline success message with toast notification.
* **Accessibility Enhancements** — ARIA attributes, semantic HTML, keyboard navigation support.
* **Improved Navigation** — Unified header with active-page highlighting.
* **Sticky Header with Fallback** — Modern look with graceful degradation.
* **Mobile UI Polish** — Buttons with max-width, centered layout.

---

## Project Structure

```
project/
├── index.html          # Homepage with blog/news
├── about.html          # About UCEV
├── departments.html    # Dynamic department list
├── contact.html        # Contact info + form + map
├── post.html           # Individual blog post view
├── styles.css          # Styles for the website
├── script.js           # JavaScript logic
├── assets/             # Images and logo
└── data/               # JSON data for departments and posts
```

---

## Getting Started

1. **Clone this repository:**

   ```bash
   https://github.com/allenimmnauel018/UCEV-Website.git
   cd UCEV-website
   ```
2. **Open `index.html` in your browser** — no build step required.

---

## Accessibility Improvements

* **ARIA Support:** Active nav links now have `aria-current="page"`.
* **Accessible Forms:** Contact form provides inline success messages with `aria-live="polite"`.
* **Keyboard Support:** Mobile menu toggle updates `aria-expanded` and closes on `Escape`.
* **Descriptive Titles:** All iframes include descriptive `title` attributes.

---

## UI/UX Improvements

* **Unified Header:** Same branding, logo, and tagline across all pages.
* **Inline Form Confirmation:** Message visible after form submission before resetting.
* **Button Width Control:** Prevents overly wide buttons on small screens.
* **Sticky Header Fallback:** Solid color background for browsers without `backdrop-filter` support.

---

## Data Files

* **`data/posts.json`** — Stores blog/news post data.
* **`data/departments.json`** — Stores department info.

---

## Deployment

The site can be hosted on **GitHub Pages**, **Netlify**, **Vercel**, or any static hosting provider.

Example for GitHub Pages:

1. Push your repository to GitHub.
2. Go to **Settings > Pages**.
3. Set the branch to `main` and folder to `/root`.
4. Save and visit the generated URL.

---

## License

This project is licensed under the MIT [LICENSE](LICENSE).

---

## Credits

Designed and developed for **University College of Engineering Villupuram** with performance, accessibility, and usability in mind.
