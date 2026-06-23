import { useState, useEffect } from "react";
import { Badge } from "./UI";
import { COLORS } from "../utils/constants";

export default function ResponderCard({ responder, index }) {
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setArrived(true), (index + 1) * 14000);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: COLORS.card,
        border: `1px solid ${arrived ? COLORS.green + "55" : COLORS.border}`,
        borderRadius: 12,
        padding: "10px 14px",
        transition: "border-color .6s",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: responder.color + "22",
          border: `2px solid ${responder.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: responder.avatar.length > 1 ? 18 : 15,
          color: responder.color,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {responder.avatar}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: COLORS.textPrim, fontWeight: 600, fontSize: 14 }}>
          {responder.name}
        </p>
        <p style={{ color: COLORS.textSec, fontSize: 11 }}>{responder.role}</p>
      </div>
      <Badge color={arrived ? COLORS.green : COLORS.orange}>
        {arrived ? "ARRIVED" : "EN ROUTE"}
      </Badge>
    </div>
  );
}
