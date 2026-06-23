import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function useSocket(caseId, onMessage, onResponderJoined) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!caseId) return;

    socketRef.current = io(SOCKET_URL, {
      query: { caseId },
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    socket.emit("join_room", { caseId });

    socket.on("new_message", (msg) => {
      onMessage?.(msg);
    });

    socket.on("responder_joined", (responder) => {
      onResponderJoined?.(responder);
    });

    return () => {
      socket.emit("leave_room", { caseId });
      socket.disconnect();
    };
  }, [caseId]);

  const sendMessage = useCallback((text, sender) => {
    if (!socketRef.current) return;
    socketRef.current.emit("send_message", {
      caseId,
      text,
      sender,
      time: new Date().toISOString(),
    });
  }, [caseId]);

  return { sendMessage };
}
