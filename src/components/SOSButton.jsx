import { useState, useRef } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 88;

export default function SOSButton({ onActivate, disabled }) {
  const [pressing, setPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);

  const start = () => {
    if (disabled) return;
    setPressing(true);
    let p = 0;
    timer.current = setInterval(() => {
      p += 3.33;
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer.current);
        setPressing(false);
        setProgress(0);
        onActivate();
      }
    }, 100);
  };

  const cancel = () => {
    clearInterval(timer.current);
    setPressing(false);
    setProgress(0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <p style={{ color: "#4A5578", fontSize: 12, textAlign: "center" }}>
        Hold the button for 3 seconds to broadcast an emergency signal
      </p>

      <div
        style={{
          position: "relative",
          width: 200,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pressing &&
          [0, 0.6, 1.2].map((delay) => (
            <div
              key={delay}
              style={{
                position: "absolute",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                background: "rgba(255,45,85,0.2)",
                animation: `pulseRing 1.8s ease-out infinite ${delay}s`,
              }}
            />
          ))}

        <svg
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            transform: "rotate(-90deg)",
          }}
        >
          <circle cx={100} cy={100} r={88} fill="none" stroke="#1A1F35" strokeWidth={5} />
          <circle
            cx={100}
            cy={100}
            r={88}
            fill="none"
            stroke="#FF2D55"
            strokeWidth={5}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset .1s linear" }}
          />
        </svg>

        <button
          onMouseDown={start}
          onMouseUp={cancel}
          onMouseLeave={cancel}
          onTouchStart={start}
          onTouchEnd={cancel}
          disabled={disabled}
          style={{
            width: 162,
            height: 162,
            borderRadius: "50%",
            border: "none",
            zIndex: 2,
            background: pressing
              ? "radial-gradient(circle at 38% 32%, #FF6B8A, #BB0022)"
              : "radial-gradient(circle at 38% 32%, #FF4060, #990011)",
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            boxShadow: pressing
              ? "0 0 70px #FF2D5599, 0 0 24px #FF2D5566, inset 0 -5px 14px rgba(0,0,0,.4)"
              : "0 0 44px #FF2D5555, 0 8px 32px rgba(0,0,0,.5), inset 0 -4px 12px rgba(0,0,0,.25)",
            transform: pressing ? "scale(.94)" : "scale(1)",
            transition: "transform .15s, box-shadow .2s",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <span style={{ fontSize: 46, lineHeight: 1 }}>🆘</span>
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#fff",
              letterSpacing: 4,
            }}
          >
            SOS
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.5)", letterSpacing: 1 }}>
            {pressing ? `${Math.min(100, Math.round(progress))}%` : "HOLD"}
          </span>
        </button>
      </div>
    </div>
  );
}
