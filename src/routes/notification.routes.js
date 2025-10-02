const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const { sendEmail } = require("../controllers/notification.controller");

// router.post('/send-email', upload.single('image'), sendEmail);
router.post("/send-email", sendEmail);

module.exports = router;
