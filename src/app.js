const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const routes = require("./routes");

require("dotenv").config();

// allow requests from your frontend domain
app.use(
  cors({
    origin: ["http://localhost:5176", "https://www.globbyfundedtraders.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", routes);
app.get("/*", (req, res) => res.send("GlobbyFundedTraders API"));
module.exports = app;
