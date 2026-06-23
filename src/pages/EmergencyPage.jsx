import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "../hooks/useLocation";
import ChatRoom from "../components/ChatRoom";
import LiveMap from "../components/LiveMap";
import { LiveDot } from "../components/UI";
import { COLORS } from "../utils/constants";
import { formatElapsed, randomId } from "../utils/helpers";

const TABS = [
  { id: "chat", label: "💬 Chat" },
  { id: "map",  label: "🗺️ Map"  },
  { id: "info", label: "📋 Info" },
];

function StatusBar({ caseId, elapsed, responderCount }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
      {[
        { label: "CASE ID",    value: "#" + caseId },
        { label: "ELAPSED",    value: elapsed },
        { label: "RESPONDERS", value: String(responderCount) },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: "7px 10px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 9, color: COLORS.textMuted, fontWeight: 700, letterSpacing: 1.5, fontFamily: "Rajdhani, sans-serif" }}>
            {label}
          </p>
          <p style={{ fontSize: 14, color: COLORS.blue, fontWeight: 700, fontFamily: "Rajdhani, sans-serif" }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function EmergencyPage() {
  const { caseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { loc, start, stop } = useLocation();
  const [tab, setTab] = useState("chat");
  const [elapsed, setElapsed] = useState(0);
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`devi_case_${caseId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setIssue(parsed.issue);
    }
    start();
    return () => stop();
  }, [caseId]);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const handleEnd = () => {
    sessionStorage.removeItem(`devi_case_${caseId}`);
    navigate("/");
  };

  if (!issue) return null;

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
      <div style={{ width: "100%", maxWidth: 430, display: "flex", flexDirection: "column", flex: 1 }}>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 20,
            paddingBottom: 12,
          }}
        >
          <h1
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: COLORS.red,
              letterSpacing: 3,
            }}
          >
            DEVI
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: COLORS.red + "18",
              border: `1px solid ${COLORS.red}44`,
              borderRadius: 20,
              padding: "4px 12px",
            }}
          >
            <LiveDot color={COLORS.red} />
            <span style={{ color: COLORS.red, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
              EMERGENCY ACTIVE
            </span>
          </div>
        </div>

        <StatusBar caseId={caseId} elapsed={formatElapsed(elapsed)} responderCount={4} />

        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "8px 4px",
                background: tab === t.id ? COLORS.red + "18" : COLORS.card,
                border: `1px solid ${tab === t.id ? COLORS.red + "66" : COLORS.border}`,
                borderRadius: 10,
                color: tab === t.id ? COLORS.red : COLORS.textSec,
                fontWeight: 600,
                fontSize: 12,
                transition: "all .2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "chat" && (
          <div style={{ flex: 1 }}>
            <ChatRoom user={user} issue={issue} loc={loc} caseId={caseId} />
          </div>
        )}

        {tab === "map" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <LiveMap loc={loc} />
            {loc && (
              <>
                <InfoRow label="📍 Address" value={loc.address} />
                <InfoRow label="🌐 Coordinates" value={`${loc.lat.toFixed(6)}, ${loc.lon.toFixed(6)}`} />
                <InfoRow label="📡 Broadcast radius" value="1 km" />
                <InfoRow label="🎯 GPS accuracy" value={`±${loc.accuracy}m`} />
              </>
            )}
          </div>
        )}

        {tab === "info" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <InfoRow label="👤 Name"             value={user.name} />
            <InfoRow label="📱 Phone"            value={`+91 ${user.phone}`} />
            <InfoRow label="🆘 Emergency"        value={`${issue.icon} ${issue.label}`} />
            <InfoRow label="📍 Address"          value={loc?.address || "Locating…"} />
            <InfoRow label="⏱️ Signal sent"      value={new Date().toLocaleTimeString()} />
            <InfoRow label="📡 Broadcast"        value="1 km radius" />
            <InfoRow label="🚔 Police notified"  value="Yes — nearest station alerted" />
            <InfoRow label="🏥 Nearest hospital" value="Auto-routed via GPS" />

            <button
              onClick={handleEnd}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "14px 0",
                background: COLORS.green + "18",
                border: `1px solid ${COLORS.green}55`,
                borderRadius: 14,
                color: COLORS.green,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              ✅ I am Safe — End Emergency
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "11px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <span style={{ color: COLORS.textSec, fontSize: 12, whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ color: COLORS.textPrim, fontSize: 12, fontWeight: 500, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}
