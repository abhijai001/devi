import { COLORS } from "../utils/constants";

export function Spinner({ size = 20, color = COLORS.red }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${color}33`,
        borderTop: `2px solid ${color}`,
        animation: "spin .7s linear infinite",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

export function Badge({ color, children }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 1.2,
        color,
        background: color + "18",
        border: `1px solid ${color}44`,
        borderRadius: 20,
        padding: "2px 9px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function LiveDot({ color = COLORS.red }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: color,
        animation: "blink 1s infinite",
        flexShrink: 0,
      }}
    />
  );
}

export function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: COLORS.textMuted,
        fontWeight: 700,
        letterSpacing: 1.5,
        marginBottom: 6,
        fontFamily: "Rajdhani, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
