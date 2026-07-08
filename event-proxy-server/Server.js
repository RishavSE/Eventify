const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const cities = ["Chandigarh", "Delhi", "Amritsar"];

app.get("/api/events", async (req, res) => {
  try {
    const allEvents = [];

    for (const city of cities) {
      const response = await axios.get("https://serpapi.com/search", {
        params: {
          engine: "google_events",
          q: `events in ${city}`,
          hl: "en",
          api_key: process.env.SERPAPI_KEY,
        },
      });
      allEvents.push(...(response.data.events_results || []));
    }

    res.json({ events_results: allEvents });
  } catch (error) {
    console.error(
      "❌ Error fetching events:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
