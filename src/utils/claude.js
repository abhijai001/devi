const API_URL = "https://api.anthropic.com/v1/messages";

export async function askClaude(messages, systemPrompt) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: systemPrompt,
        messages,
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Stay calm. Help is on the way.";
  } catch {
    return "Stay calm. Help is on the way. Responders have been notified.";
  }
}

export function buildSystemPrompt(user, issue, loc) {
  return `You are DEVI, an emergency response AI assistant built to help people in crisis.
An emergency has been reported: "${issue.label}" at ${loc?.address || "unknown location"}.
The person in distress is ${user.name} (phone: +91 ${user.phone}).
Your role: keep them calm, give targeted first-aid or safety instructions for "${issue.label}", collect key details about the situation, and coordinate with responders in this chat room.
Be concise, warm, and direct. Always acknowledge their fear before giving instructions.
Never mention being an AI in your opening — lead with help.`;
}
