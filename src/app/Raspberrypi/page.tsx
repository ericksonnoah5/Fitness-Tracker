"use client";

import Script from "next/script";
import "./style.css";

export default function Page() {
  return (
    <>
      <div className="dashboard">
        <div className="cal-left">
          <div className="cal-embed">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=noah%40ultimumgroup.com&src=ericksonnoah5%40gmail.com&src=katiekanaan%40gmail.com&ctz=America%2FChicago&mode=MONTH&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>

        <div className="right-grid">
          <div className="photo-panel">
            <img
              id="img"
              className="photo-layer active"
              src="/raspberrypi/photos/img.JPG"
              alt="Camera Feed"
            />
            <img id="img2" className="photo-layer" src="" alt="" />
          </div>

          <div className="agenda-embed">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=noah%40ultimumgroup.com&src=ericksonnoah5%40gmail.com&src=katiekanaan%40gmail.com&ctz=America%2FChicago&mode=AGENDA&showTitle=0&showNav=0&showPrint=0&showTabs=0&showCalendars=0"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>

          <div className="forecast-card">
            <div className="location-label">Des Moines, Iowa</div>
            <div id="forecast"></div>
          </div>

          <div className="info-panel">
            <div className="time-section">
              <div id="time"></div>
              <div id="date"></div>
            </div>
            <div className="weather-section">
              <div className="stat-card">
                <span className="stat-value" id="temp"></span>
                <span className="stat-label">Temperature</span>
              </div>
              <div className="stat-card">
                <span className="stat-value" id="wind"></span>
                <span className="stat-label">Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script src="/raspberrypi/script.js" strategy="afterInteractive" />
    </>
  );
}
