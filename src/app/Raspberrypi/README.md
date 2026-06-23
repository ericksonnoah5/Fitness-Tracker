# 🍓 Raspberry Pi Dashboard

A personal home dashboard designed to run on a Raspberry Pi. Displays live weather, time, date, and a rotating photo feed — all in the browser.

---

## Features

- 🌡️ **Live Weather** — Current temperature and wind speed pulled from [Open-Meteo](https://open-meteo.com/) (no API key required)
- 🕐 **Clock & Date** — Real-time local time and date using the Pi's system clock
- 📸 **Photo Slideshow** — Rotates through local photos every minute

## Setup

1. Clone the repo onto your Raspberry Pi
2. Set your timezone:
   ```bash
   sudo timedatectl set-timezone America/Chicago
   ```
3. Open `index.html` in a browser

---

> Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.
