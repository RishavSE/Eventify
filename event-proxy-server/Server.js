const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const cities = [
  "Chandigarh",
  "Delhi",
  "Amritsar",
  "Noida",
  "Mumbai",
];

app.get("/api/events", async (req, res) => {
  try {
    const allEvents = [];

    for (const city of cities) {
      console.log(`Searching events for ${city}...`);

      const eventsResponse = await axios.get("https://serpapi.com/search", {
        params: {
          engine: "google_events",
          q: `events in ${city}`,
          hl: "en",
          api_key: process.env.SERPAPI_KEY,
        },
      });

      const eventsData = eventsResponse.data;

      const isEmpty =
        eventsData.events_results_state === "Fully empty" ||
        !Array.isArray(eventsData.events_results) ||
        eventsData.events_results.length === 0;

      if (!isEmpty) {
        console.log(
          ` ${city}: Google Events returned ${eventsData.events_results.length} events`
        );

        allEvents.push(
          ...eventsData.events_results.map((event) => ({
            ...event,
            source: "google_events",
            city,
          }))
        );

        continue;
      }

      console.log(` ${city}: Google Events empty. Falling back...`);

      const googleResponse = await axios.get("https://serpapi.com/search", {
        params: {
          engine: "google",
          q: `events in ${city}`,
          hl: "en",
          api_key: process.env.SERPAPI_KEY,
        },
      });

      const googleData = googleResponse.data;

      if (
        Array.isArray(googleData.events_results) &&
        googleData.events_results.length > 0
      ) {
        console.log(
          ` ${city}: Google fallback returned ${googleData.events_results.length} events`
        );

        allEvents.push(
          ...googleData.events_results.map((event) => ({
            ...event,
            source: "google",
            city,
          }))
        );
      } else {
        console.log(`❌ ${city}: No events found from either engine.`);
      }
    }

    res.json({
      totalEvents: allEvents.length,
      events_results: allEvents,
    });
  } catch (error) {
    console.error(
      "❌ Error fetching events:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to fetch events",
    });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});