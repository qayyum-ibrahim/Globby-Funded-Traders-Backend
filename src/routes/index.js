const authRoutes = require("./auth.routes");
const express = require("express");
const notificationRoutes = require("./notification.routes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notification", notificationRoutes);
module.exports = router;
