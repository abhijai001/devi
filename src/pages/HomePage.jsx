import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "../hooks/useLocation";
import { useEffect } from "react";
import SOSButton from "../components/SOSButton";
import IssueModal from "../components/IssueModal";
import LocationStrip from "../components/LocationStrip";
import { COLORS } from "../utils/constants";
import { randomId } from "../utils/helpers";

const QUICK_ACTIONS = [
  { icon: "👥", label: "Trusted Contacts", sub: "Alert family instantly" },
  { icon: "🗺️", label: "Safe Routes",       sub: "AI-powered navigation" },
  { icon: "📞", label: "Fake Call",          sub: "Exit unsafe situations" },
  { icon: "📍", label: "Share Location",     sub: "Send your live link" },
];

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { loc, error, loading, start, stop } = useLocation();
  const [showIssueModal, setShowIssueModal] = useState(false);

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  const handleIssueSelect = (issue) => {
    const caseId = randomId();
    sessionStorage.setItem(`devi_case_${caseId}`, JSON.stringify({ issue, loc }));
    navigate(`/emergency/${caseId}`);
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
        padding: "0 16px 32px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 430, display: "flex", flexDirection: "column", gap: 16 }}>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: COLORS.red,
                letterSpacing: 3,
              }}
            >
              DEVI
            </h1>
            <p style={{ color: COLORS.textSec, fontSize: 12 }}>
              Hello, {user.name.split(" ")[0]} 👋
            </p>
          </div>
          <button
            onClick={logout}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "7px 14px",
              color: COLORS.textSec,
              fontSize: 12,
            }}
          >
            Sign out
          </button>
        </div>

        <LocationStrip loc={loc} loading={loading} error={error} />

        <div style={{ paddingTop: 8, paddingBottom: 4 }}>
          <SOSButton onActivate={() => setShowIssueModal(true)} disabled={false} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: "14px 12px",
                textAlign: "left",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.blue + "44")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
            >
              <p style={{ fontSize: 24, marginBottom: 6 }}>{action.icon}</p>
              <p style={{ color: COLORS.textPrim, fontWeight: 600, fontSize: 13 }}>{action.label}</p>
              <p style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 2 }}>{action.sub}</p>
            </button>
          ))}
        </div>

        <div
          style={{
            background: COLORS.blue + "0C",
            border: `1px solid ${COLORS.blue}22`,
            borderRadius: 14,
            padding: "12px 16px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 16 }}>💡</span>
          <p style={{ color: COLORS.textSec, fontSize: 12, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.blue }}>Stay safe:</strong> Add trusted contacts so
            they receive your live GPS link the moment you trigger SOS.
          </p>
        </div>
      </div>

      {showIssueModal && (
        <IssueModal onSelect={handleIssueSelect} />
      )}
    </div>
  );
}
