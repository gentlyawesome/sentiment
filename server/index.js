// dotenv
require("dotenv").config();

// import
const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// openai
const { analyzeSentiment } = require("./lib/openai");

// rate limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
});

// express
const app = express();

// middleware
app.use(morgan("dev"));
app.use(limiter);
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// dependency injection
const createSentimentRoute = (analyzeSentiment) => {
  return async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }

      const sentiment = await analyzeSentiment(text);

      res.status(200).json({ message: sentiment });
    } catch (err) {
      if (res.statusCode === 429) {
        res.status(429).json({ message: "Too many requests" });
      } else {
        res.status(500).json({ message: "Sorry, something went wrong" });
      }
    }
  };
};

// routes
app.post("/v1/sentiment", createSentimentRoute(analyzeSentiment));

// listen
app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
