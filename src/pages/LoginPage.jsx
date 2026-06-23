import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import OtpInput from "../components/OtpInput";
import { Spinner } from "../components/UI";
import { COLORS } from "../utils/constants";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("info");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (!/^\d{10}$/.test(phone)) { setError("Enter a valid 10-digit mobile number."); return; }
    setError("");
    setLoading(true);

    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerify = () => {
    if (otp.length < 6) { setError("Enter the complete 6-digit OTP."); return; }
    if (otp !== generatedOtp) { setError("Incorrect OTP. Please try again."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      login({ name: name.trim(), phone });
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="fade-up"
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            background: "radial-gradient(circle at 38% 32%, #FF4060, #990011)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            margin: "0 auto 16px",
            boxShadow: "0 0 40px #FF2D5555",
          }}
        >
          🆘
        </div>
        <h1
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.red,
            letterSpacing: 4,
          }}
        >
          DEVI
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4, letterSpacing: 1 }}>
          DIGITAL EMERGENCY VOICE INTELLIGENCE
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 22,
          padding: 28,
        }}
      >
        {step === "info" ? (
          <>
            <h2 style={{ color: COLORS.textPrim, fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
              Create your profile
            </h2>
            <p style={{ color: COLORS.textSec, fontSize: 13, marginBottom: 24 }}>
              Your details are only used for emergency identification.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <p style={{ color: COLORS.textSec, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6, fontFamily: "Rajdhani, sans-serif" }}>
                  FULL NAME
                </p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  style={{
                    width: "100%",
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "12px 16px",
                    color: COLORS.textPrim,
                    fontSize: 15,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <p style={{ color: COLORS.textSec, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6, fontFamily: "Rajdhani, sans-serif" }}>
                  MOBILE NUMBER
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <div
                    style={{
                      background: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: "12px 14px",
                      color: COLORS.textSec,
                      fontSize: 15,
                      whiteSpace: "nowrap",
                    }}
                  >
                    🇮🇳 +91
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    inputMode="numeric"
                    style={{
                      flex: 1,
                      background: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: "12px 16px",
                      color: COLORS.textPrim,
                      fontSize: 15,
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p style={{ color: COLORS.red, fontSize: 12, marginTop: 12 }}>⚠ {error}</p>
            )}

            <button
              onClick={handleSendOtp}
              disabled={loading}
              style={{
                marginTop: 22,
                width: "100%",
                padding: "14px 0",
                background: `linear-gradient(135deg, ${COLORS.red}, #CC0033)`,
                border: "none",
                borderRadius: 14,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <><Spinner size={18} color="#fff" /> Sending OTP…</> : "Send OTP →"}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setStep("info"); setOtp(""); setError(""); }}
              style={{
                background: "none",
                border: "none",
                color: COLORS.textSec,
                fontSize: 13,
                marginBottom: 16,
                padding: 0,
              }}
            >
              ← Back
            </button>

            <h2 style={{ color: COLORS.textPrim, fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
              Verify your number
            </h2>
            <p style={{ color: COLORS.textSec, fontSize: 13, marginBottom: 6 }}>
              OTP sent to +91 {phone}
            </p>

            <div
              style={{
                background: COLORS.blue + "11",
                border: `1px solid ${COLORS.blue}33`,
                borderRadius: 10,
                padding: "8px 14px",
                marginBottom: 22,
                fontSize: 12,
              }}
            >
              <span style={{ color: COLORS.blue, fontWeight: 600 }}>Dev mode — OTP: </span>
              <span style={{ color: COLORS.textPrim, fontFamily: "monospace", letterSpacing: 3 }}>
                {generatedOtp}
              </span>
            </div>

            <OtpInput value={otp} onChange={setOtp} />

            {error && (
              <p style={{ color: COLORS.red, fontSize: 12, marginTop: 12, textAlign: "center" }}>
                ⚠ {error}
              </p>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || otp.length < 6}
              style={{
                marginTop: 22,
                width: "100%",
                padding: "14px 0",
                background:
                  otp.length === 6
                    ? `linear-gradient(135deg, ${COLORS.red}, #CC0033)`
                    : COLORS.card,
                border: "none",
                borderRadius: 14,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background .3s",
              }}
            >
              {loading ? <><Spinner size={18} color="#fff" /> Verifying…</> : "Verify & Enter →"}
            </button>

            <button
              onClick={handleSendOtp}
              style={{
                marginTop: 12,
                width: "100%",
                background: "none",
                border: "none",
                color: COLORS.textSec,
                fontSize: 12,
              }}
            >
              Resend OTP
            </button>
          </>
        )}
      </div>

      <p style={{ color: COLORS.border, fontSize: 11, marginTop: 24, textAlign: "center" }}>
        By continuing you agree to DEVI's Emergency Terms of Service
      </p>
    </div>
  );
}
