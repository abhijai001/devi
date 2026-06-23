const express = require("express");
const router = express.Router();

const otpStore = new Map();

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number." });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilio = require("twilio")(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      await twilio.messages.create({
        body: `Your DEVI emergency app OTP is: ${otp}. Valid for 5 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${phone}`,
      });
    } catch (err) {
      console.error("Twilio error:", err.message);
    }
  } else {
    console.log(`[DEV] OTP for ${phone}: ${otp}`);
  }

  res.json({ success: true, message: "OTP sent." });
});

router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const record = otpStore.get(phone);

  if (!record) return res.status(400).json({ error: "OTP not found. Request a new one." });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return res.status(400).json({ error: "OTP expired. Request a new one." });
  }
  if (record.otp !== otp) return res.status(400).json({ error: "Incorrect OTP." });

  otpStore.delete(phone);
  res.json({ success: true, message: "Verified." });
});

module.exports = router;
