# The Weekly News Pulse

A modern, high-performance digital news publication and archive dashboard. Parses breaking news feeds and Weekly Citizen 2026 historical archives, rendering stories in a clean editorial newspaper layout.

## Features
- **Editorial Newspaper Layout**: Features breaking news ticker marquee, lead story hero banner, serif headlines (`Playfair Display`), and clean reading views.
- **2026 Historical Archive & Live Feed**: Multi-source news feed powered by automated scraping updating every 3 hours.
- **Topic & Outlet Filters**: Instant filtering by Outlet (*Weekly Citizen, BBC News*) and Category (*Kenya & East Africa, Politics, Business, Technology, Health*).
- **Responsive & Saved Stories**: Bookmark stories with local storage state persistence.

---

## Scheduled Background Updates
The automated scraper workflow is configured in `.github/workflows/scrape.yml` to execute **every 3 hours** (`0 */3 * * *`).

---

## Local Development & Build

### Run Locally
```bash
npm run dev
```

### Build Production Bundle
```bash
npm run build
```
