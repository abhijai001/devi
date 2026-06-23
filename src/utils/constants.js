export const ISSUE_TYPES = [
  { id: "assault",  label: "Physical Assault",  icon: "⚠️" },
  { id: "accident", label: "Road Accident",      icon: "🚗" },
  { id: "medical",  label: "Medical Emergency",  icon: "🏥" },
  { id: "fire",     label: "Fire / Gas Leak",    icon: "🔥" },
  { id: "theft",    label: "Robbery / Theft",    icon: "🔓" },
  { id: "other",    label: "Other Emergency",    icon: "🆘" },
];

export const COLORS = {
  bg:        "#080C18",
  surface:   "#12172B",
  card:      "#1A1F35",
  border:    "#2A3050",
  red:       "#FF2D55",
  blue:      "#00B4FF",
  green:     "#00D68F",
  orange:    "#FF9F00",
  purple:    "#C850C0",
  textPrim:  "#E8ECF8",
  textSec:   "#6B7A9F",
  textMuted: "#4A5578",
};

export const RESPONDER_POOL = [
  { name: "Arjun M.",    role: "Nearby Civilian", avatar: "A", color: "#00B4FF", joinAt: 6000  },
  { name: "Priya K.",    role: "Nurse on duty",   avatar: "P", color: "#00D68F", joinAt: 12000 },
  { name: "PCR Van #47", role: "Delhi Police",    avatar: "🚔",color: "#FF9F00", joinAt: 18000 },
  { name: "Rahul S.",    role: "Nearby Civilian", avatar: "R", color: "#C850C0", joinAt: 24000 },
];

export const RESPONDER_MESSAGES = [
  "I'm on my way right now, stay on the line!",
  "Can you describe your exact position? Any landmarks nearby?",
  "Police have been notified. Keep your phone visible.",
  "I've called an ambulance too. Stay calm, help is coming.",
  "I can see your pin on the map — 2 minutes away!",
];
