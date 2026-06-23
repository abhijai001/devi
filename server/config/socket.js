function setupSocket(io) {
  io.on("connection", (socket) => {
    const { caseId } = socket.handshake.query;

    socket.on("join_room", ({ caseId }) => {
      socket.join(caseId);
      socket.to(caseId).emit("responder_joined", {
        id: socket.id,
        joinedAt: new Date().toISOString(),
      });
    });

    socket.on("send_message", (payload) => {
      io.to(payload.caseId).emit("new_message", {
        ...payload,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      });
    });

    socket.on("location_update", (payload) => {
      socket.to(payload.caseId).emit("location_updated", payload);
    });

    socket.on("leave_room", ({ caseId }) => {
      socket.leave(caseId);
    });

    socket.on("disconnect", () => {});
  });
}

module.exports = { setupSocket };
