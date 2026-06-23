import { useRef } from "react";
import { COLORS } from "../utils/constants";

export default function OtpInput({ value, onChange }) {
  const refs = Array.from({ length: 6 }, () => useRef(null));
  const digits = (value + "      ").slice(0, 6).split("");

  const handleKey = (i, e) => {
    if (e.key === "Backspace") {
      onChange(value.slice(0, i) + value.slice(i + 1));
      refs[i - 1]?.current?.focus();
    } else if (/^\d$/.test(e.key)) {
      const next = value.slice(0, i) + e.key + value.slice(i + 1);
      onChange(next.slice(0, 6));
      refs[i + 1]?.current?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          readOnly
          onKeyDown={(e) => handleKey(i, e)}
          onFocus={() => refs[i].current?.select()}
          style={{
            width: 46,
            height: 54,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            background: d.trim() ? COLORS.red + "18" : COLORS.card,
            border: `1.5px solid ${d.trim() ? COLORS.red : COLORS.border}`,
            borderRadius: 10,
            color: COLORS.textPrim,
            outline: "none",
            transition: "border-color .2s, background .2s",
          }}
        />
      ))}
    </div>
  );
}
