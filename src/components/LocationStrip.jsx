import { COLORS } from "../utils/constants";

export default function LocationStrip({ loc, loading, error }) {
  const status = loc ? "live" : loading ? "loading" : "error";

  const dotColor = {
    live: COLORS.blue,
    loading: COLORS.orange,
    error: COLORS.red,
  }[status];

  const labelText = {
    live: "LIVE LOCATION",
    loading: "ACQUIRING GPS…",
    error: "LOCATION UNAVAILABLE",
  }[status];

  const bodyText = loc
    ? loc.address
    : loading
    ? "Searching for your position…"
    : error || "Please enable location permissions";

  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
          animation: loc ? "locationPing 2s infinite" : "blink 1s infinite",
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            color: COLORS.textMuted,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.2,
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          {labelText}
        </p>
        <p
          style={{
            color: COLORS.textPrim,
            fontSize: 12,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {bodyText}
        </p>
      </div>
      {loc && (
        <span style={{ color: COLORS.textMuted, fontSize: 10, whiteSpace: "nowrap" }}>
          ±{loc.accuracy}m
        </span>
      )}
    </div>
  );
}
