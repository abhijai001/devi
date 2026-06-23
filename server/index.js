require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const emergencyRoutes = require("./routes/emergency");
const { setupSocket } = require("./config/socket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`DEVI server running on port ${PORT}`);
});
