import { useState, useEffect, useRef, useCallback } from "react";
import { Spinner } from "./UI";
import { COLORS, RESPONDER_POOL, RESPONDER_MESSAGES } from "../utils/constants";
import { askClaude, buildSystemPrompt } from "../utils/claude";
import { randomId, formatTime } from "../utils/helpers";
import ResponderCard from "./ResponderCard";

export default function ChatRoom({ user, issue, loc, caseId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [responders, setResponders] = useState([RESPONDER_POOL[0]]);
  const historyRef = useRef([]);
  const bottomRef = useRef(null);

  const addMsg = useCallback((msg) => {
    setMessages((prev) => [...prev, { id: randomId(), time: formatTime(), ...msg }]);
  }, []);

  useEffect(() => {
    (async () => {
      setAiLoading(true);
      const systemPrompt = buildSystemPrompt(user, issue, loc);
      const greeting = await askClaude(
        [{ role: "user", content: `Emergency reported: ${issue.label}. Greet the person and ask for key details immediately.` }],
        systemPrompt
      );
      setAiLoading(false);
      addMsg({ sender: "DEVI AI", ai: true, text: greeting });
      historyRef.current = [
        { role: "user", content: `Emergency: ${issue.label}` },
        { role: "assistant", content: greeting },
      ];

      addMsg({ system: true, text: "🛰️ Emergency signal broadcast to 1 km radius" });
      setTimeout(() => addMsg({ system: true, text: "🚔 Nearest police station notified" }), 1500);
      setTimeout(() => addMsg({ system: true, text: "📍 Your live location is being shared with responders" }), 3000);
    })();
  }, []);

  useEffect(() => {
    RESPONDER_POOL.slice(1).forEach((r, i) => {
      const t1 = setTimeout(() => {
        setResponders((prev) => [...prev, r]);
        addMsg({ system: true, text: `✅ ${r.name} (${r.role}) joined to help` });
      }, r.joinAt);

      const t2 = setTimeout(() => {
        addMsg({
          sender: r.name,
          text: RESPONDER_MESSAGES[i % RESPONDER_MESSAGES.length],
          color: r.color,
        });
      }, r.joinAt + 2500);

      return () => { clearTimeout(t1); clearTimeout(t2); };
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || aiLoading) return;
    setInput("");

    addMsg({ sender: user.name, mine: true, text });
    historyRef.current.push({ role: "user", content: text });

    setAiLoading(true);
    const systemPrompt = buildSystemPrompt(user, issue, loc);
    const reply = await askClaude(historyRef.current, systemPrompt);
    setAiLoading(false);

    historyRef.current.push({ role: "assistant", content: reply });
    addMsg({ sender: "DEVI AI", ai: true, text: reply });
  }, [input, aiLoading, user, issue, loc, addMsg]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
      <div>
        <p
          style={{
            color: COLORS.textMuted,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.5,
            marginBottom: 6,
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          RESPONDERS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {responders.map((r, i) => (
            <ResponderCard key={r.name} responder={r} index={i} />
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: "4px 2px",
          minHeight: 140,
          maxHeight: 300,
        }}
      >
        {messages.map((msg) =>
          msg.system ? (
            <div
              key={msg.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 20,
                  padding: "4px 14px",
                  color: COLORS.textSec,
                  fontSize: 11,
                }}
              >
                {msg.text}
              </span>
            </div>
          ) : (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: msg.mine ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  background: msg.mine
                    ? COLORS.red + "20"
                    : msg.ai
                    ? COLORS.blue + "15"
                    : COLORS.card,
                  border: `1px solid ${
                    msg.mine
                      ? COLORS.red + "40"
                      : msg.ai
                      ? COLORS.blue + "30"
                      : COLORS.border
                  }`,
                  borderRadius: msg.mine
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  padding: "9px 13px",
                }}
              >
                <p
                  style={{
                    color: msg.ai ? COLORS.blue : msg.color || COLORS.textSec,
                    fontSize: 10,
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {msg.ai ? "🤖 DEVI AI" : msg.sender}
                </p>
                <p
                  style={{
                    color: COLORS.textPrim,
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}
                >
                  {msg.text}
                </p>
                <p
                  style={{
                    color: COLORS.textMuted,
                    fontSize: 10,
                    marginTop: 3,
                    textAlign: "right",
                  }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          )
        )}

        {aiLoading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 8px" }}>
            <Spinner size={14} color={COLORS.blue} />
            <span style={{ color: COLORS.textSec, fontSize: 12 }}>DEVI AI is responding…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Describe your situation…"
          style={{
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 24,
            padding: "11px 18px",
            color: COLORS.textPrim,
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || aiLoading}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            flexShrink: 0,
            background: input.trim() && !aiLoading
              ? `linear-gradient(135deg, ${COLORS.red}, #CC0033)`
              : COLORS.card,
            border: "none",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background .2s",
            color: "#fff",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
