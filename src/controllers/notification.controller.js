const brevoClient = require("../config/brevoClient");
const SibApiV3Sdk = require("sib-api-v3-sdk");

exports.sendEmail = async (req, res) => {
  try {
    const {
      emails,
      emailType,
      reason,
      login,
      server,
      password,
      email, // still needed for challenge_passed
      htmlContent,
    } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ message: "Emails array is required" });
    }

    if (!emailType) {
      return res.status(400).json({ message: "emailType is required" });
    }

    // Validate inputs based on emailType
    switch (emailType) {
      case "account_suspended":
        if (!reason) {
          return res
            .status(400)
            .json({ message: "Reason is required for account_suspended" });
        }
        break;

      case "evaluation_login":
      case "funded_login":
        if (!login || !server || !password) {
          return res.status(400).json({
            message:
              "Login, server, and password are required for this email type",
          });
        }
        break;

      case "challenge_passed":
        if (!email) {
          return res
            .status(400)
            .json({ message: "Email is required for challenge_passed" });
        }
        break;

      default:
        return res.status(400).json({ message: "Invalid emailType" });
    }

    const transactionalApi = brevoClient();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = {
      email: process.env.SENDER_EMAIL,
      name: "Globby Funded Traders",
    };
    sendSmtpEmail.to = emails.map((e) => ({ email: e }));
    sendSmtpEmail.replyTo = { email: "globbyfundedtraders@gmail.com" };
    sendSmtpEmail.subject = "Notification from Globby Funded Traders";
    sendSmtpEmail.htmlContent = htmlContent || "";

    const response = await transactionalApi.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent");
    res.json({ message: "Email sent successfully", response });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to send email", error: err.message });
  }
};
