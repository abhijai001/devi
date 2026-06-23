import { ISSUE_TYPES, COLORS } from "../utils/constants";

export default function IssueModal({ onSelect }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#080C18ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        backdropFilter: "blur(6px)",
        padding: 16,
      }}
    >
      <div
        className="fade-up"
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.red}33`,
          borderRadius: 22,
          padding: 28,
          width: "100%",
          maxWidth: 360,
        }}
      >
        <p
          style={{
            color: COLORS.red,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 6,
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          EMERGENCY SIGNAL ACTIVATED
        </p>
        <h2
          style={{
            color: COLORS.textPrim,
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          What's happening?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {ISSUE_TYPES.map((issue) => (
            <button
              key={issue.id}
              onClick={() => onSelect(issue)}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 14,
                padding: "16px 8px",
                color: COLORS.textPrim,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                fontWeight: 600,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.red;
                e.currentTarget.style.background = COLORS.red + "11";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.background = COLORS.card;
              }}
            >
              <span style={{ fontSize: 28 }}>{issue.icon}</span>
              {issue.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
