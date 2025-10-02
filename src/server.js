require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5010;
(async () => {
  try {
    await connectDB().then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
