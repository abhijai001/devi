# DEVI — Digital Emergency Voice Intelligence

A real-time emergency response web application. One hold-to-activate SOS button broadcasts your live GPS location to nearby users within a 1 km radius, notifies the nearest police station, and opens a shared chat room where responders and an AI assistant coordinate help.

---
## Developer

**Abhijeet Jaiswal**  
Full Stack Developer  
[GitHub](https://github.com/abhijai001)

## Features

- **Hold-to-SOS** — 3-second press prevents accidental triggers; choose from 6 emergency types
- **Live GPS tracking** — Real browser geolocation with reverse geocoding via OpenStreetMap
- **AI-powered chat** — Claude AI joins every emergency room to guide the victim through first aid and keep them calm
- **Responder system** — Nearby users receive a notification and can join the emergency chat room
- **Real-time messaging** — Socket.IO keeps all parties in sync with zero page refresh
- **Phone OTP login** — Twilio SMS verification (dev mode shows OTP on screen)
- **Emergency info panel** — Full incident summary with coordinates, hospital routing, and case ID
- **Live map embed** — OpenStreetMap iframe centered on victim's real-time coordinates

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Vite |
| Real-time | Socket.IO |
| AI Chat | Anthropic Claude API (claude-sonnet-4-6) |
| Maps | OpenStreetMap + Nominatim reverse geocoding |
| Auth / OTP | Twilio SMS (simulated in dev mode) |
| Backend | Node.js, Express |
| Deployment | Vercel (frontend) + Railway (backend) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Twilio account](https://www.twilio.com) (optional for dev)

### Frontend

```bash
cd devi
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd devi/server
npm install
cp .env.example .env
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000).

### Environment Variables

**Frontend** (`.env`):
```
VITE_SOCKET_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env`):
```
PORT=5000
CLIENT_URL=http://localhost:3000
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

If Twilio keys are missing the server runs in dev mode and logs OTPs to the console.

---

## Project Structure

```
devi/
├── src/
│   ├── components/
│   │   ├── ChatRoom.jsx        Real-time AI + responder chat
│   │   ├── IssueModal.jsx      Emergency type picker
│   │   ├── LiveMap.jsx         OpenStreetMap live embed
│   │   ├── LocationStrip.jsx   GPS status bar
│   │   ├── OtpInput.jsx        6-digit OTP field
│   │   ├── ResponderCard.jsx   Responder status tile
│   │   ├── SOSButton.jsx       Hold-to-activate SOS
│   │   └── UI.jsx              Shared atoms (Badge, Spinner, etc.)
│   ├── hooks/
│   │   ├── useAuth.js          Auth context + localStorage
│   │   ├── useLocation.js      Real GPS watchPosition hook
│   │   └── useSocket.js        Socket.IO connection hook
│   ├── pages/
│   │   ├── LoginPage.jsx       Name + phone + OTP flow
│   │   ├── HomePage.jsx        SOS button + quick actions
│   │   └── EmergencyPage.jsx   Active emergency (chat/map/info)
│   ├── utils/
│   │   ├── claude.js           Anthropic API wrapper
│   │   ├── constants.js        Issue types, colors, responder data
│   │   └── helpers.js          ID gen, distance calc, formatters
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── routes/
│   │   ├── auth.js             OTP send + verify endpoints
│   │   └── emergency.js        Case create/read/resolve endpoints
│   ├── config/
│   │   └── socket.js           Socket.IO room + event handlers
│   └── index.js                Express + Socket.IO server
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Deployment

**Frontend → Vercel**

```bash
npm run build
vercel deploy dist/
```

**Backend → Railway**

Push the `server/` folder to a Railway project and set environment variables in the Railway dashboard.

---

## Roadmap

- [ ] Firebase push notifications for nearby responders (FCM)
- [ ] GeoFire integration for real 1 km radius user queries
- [ ] Voice recording during emergencies
- [ ] Trusted contacts SMS with live location link
- [ ] Multi-language support (Hindi, Tamil, Bengali)
- [ ] ERSS 112 API integration for direct police dispatch

---

## License

MIT
