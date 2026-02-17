# Davenport House Clinic Website

Static, mobile-first healthcare website build for Davenport House Clinic (Stalybridge, UK).

## Structure

- `index.html`
- `about.html`
- `team.html`
- `services.html`
- `services/physiotherapy.html`
- `services/podiatry.html`
- `services/sports-massage.html`
- `conditions.html`
- `contact.html`
- `book.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/img/static-map.svg`
- `robots.txt`
- `sitemap.xml`

## Local Preview

Open `index.html` directly in a browser, or run a local server:

```powershell
cd c:\Users\samre\Downloads\skripts\davenport-house-clinic-site
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deployment Plan (Git + Hosting)

1. Create a Git repository in `davenport-house-clinic-site`.
2. Push to GitHub (`main` branch).
3. Deploy with one of the options below.

### Option A: Netlify (recommended for static)

1. In Netlify, import the GitHub repo.
2. Build command: leave empty.
3. Publish directory: `/` (repo root).
4. Deploy.

### Option B: GitHub Pages

1. Push to GitHub.
2. In repo settings, enable GitHub Pages from `main` branch root.
3. Site publishes under your GitHub Pages URL.

### Option C: Traditional web hosting (cPanel/FTP)

1. Upload all files from `davenport-house-clinic-site` to your web root.
2. Ensure `index.html` is in root.
3. Confirm `services/` and `assets/` folders upload unchanged.

## Form & Booking Integration

- Booking is already linked to Cliniko:
  - `https://davenport-house.cliniko.com/bookings?business_id=55327`
- Contact/newsletter forms currently use client-side validation only.
- Connect form submission to your chosen backend endpoint (Node.js, PHP, or form service).

### Minimal PHP form endpoint example

```php
<?php
// save as submit-contact.php
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';
mail('info@dhclinic.co.uk', 'Website Enquiry', "Name: $name\nEmail: $email\nPhone: $phone\n\n$message");
echo 'OK';
```

Then update `contact.html` form to `action="submit-contact.php" method="post"`.

## Content Maintenance

### Regular updates

- Update opening hours in each page footer if clinic times change.
- Add new testimonials in `index.html` testimonial section.
- Update team bios in `team.html`.
- Add condition/article cards in `conditions.html` and homepage blog placeholders.

### SEO updates

- Keep `title`, `meta description`, and H1 aligned on every page.
- Update `sitemap.xml` if pages are added or removed.
- Keep NAP (name, address, phone) identical across all pages.
- Keep JSON-LD schema details in sync with contact details.

## Performance & Accessibility Notes

- Lightweight static CSS/JS with no heavy frameworks.
- Mobile nav with keyboard and screen-reader support.
- ARIA labels, semantic sections, alt text, and skip link included.
- High contrast and larger text toggles available in footer.
- Replace all `[IMAGE-...]` placeholders with real, licensed clinic photos before go-live.
