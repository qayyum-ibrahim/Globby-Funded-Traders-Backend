const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", routes);
app.get("/*", (req, res) => res.send("GlobbyFundedTraders API"));
module.exports = app;
