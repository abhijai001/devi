import { Spinner } from "./UI";
import { COLORS } from "../utils/constants";
import { LiveDot } from "./UI";

export default function LiveMap({ loc }) {
  if (!loc) {
    return (
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          height: 260,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Spinner size={28} color={COLORS.blue} />
        <p style={{ color: COLORS.textSec, fontSize: 13 }}>Acquiring GPS signal…</p>
      </div>
    );
  }

  const delta = 0.008;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lon - delta},${loc.lat - 0.006},${loc.lon + delta},${loc.lat + 0.006}&layer=mapnik&marker=${loc.lat},${loc.lon}`;

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <iframe
        title="live-map"
        src={mapUrl}
        width="100%"
        height="260"
        style={{ border: "none", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          background: "#080C18CC",
          border: `1px solid ${COLORS.red}44`,
          borderRadius: 20,
          padding: "4px 12px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <LiveDot color={COLORS.red} />
        <span style={{ color: COLORS.red, fontSize: 11, fontWeight: 700 }}>LIVE LOCATION</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          background: "#080C18CC",
          borderRadius: 10,
          padding: "4px 10px",
          color: COLORS.textSec,
          fontSize: 10,
        }}
      >
        ±{loc.accuracy}m accuracy
      </div>
    </div>
  );
}
