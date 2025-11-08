import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";
import { io } from "socket.io-client";

export const ChatProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [roomId, setRoomId] = useState("")
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const status = user !== null && token !== null;
        setIsAuthenticated(status);
        console.log("Authenticated:", status);
    }, [user, token]);

    useEffect(() => {
        if (!isAuthenticated) return;
        console.log(roomId)
        const newSocket = io(import.meta.env.VITE_API_BASE, {
            transports: ["websocket"],
        });

        setSocket(newSocket);

        const handleMessage = (msg) => {
            console.log("received")
            addMessage(msg, "PRUEBA", roomId, "left");
        };

        newSocket.on("connect", () => {
            console.log("🟢 Connected to socket server:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("🔴 Disconnected from socket server");
        });

        newSocket.on("message", handleMessage);

        // ✅ Cleanup
        return () => {
            newSocket.off("message", handleMessage);
            newSocket.disconnect();
        };
    }, [isAuthenticated, roomId]);

    const addMessage = (text, username, roomId, side) => setMessages(prev => ([
        ...prev,
        {
            id: messages.length,
            username: username || "",
            text,
            roomId: roomId || "",
            side: side || "left"
        }
    ]))
    const addServerMessage = (text) => addMessage(text, "SERVER", "", "left")
    const addUserMessage = (text) => addMessage(text, user.username, roomId, "right")
    const clearMessages = () => setMessages([])

    const joinRoom = async (roomName) => {
        if (socket && socket.connected) {
            clearMessages()

            addMessage(`Joined room: ${roomName}`)
            addMessage(`Fetching messages, please wait`)
            const roomMessages = await fetchMessages(roomName, token)
            socket.emit("joinRoom", roomName);
            setRoomId(roomName)
            roomMessages.forEach((k) => addServerMessage(k.message))
        } else {
            addMessage("Socket not connected — cannot join room yet.")
        }
    };

    const postMessage = async (message) => {
        if (!roomId || !token || !message) return
        console.log("post", roomId)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // optional, remove if not needed
                },
                body: JSON.stringify({ room: roomId, message }),
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(`Server responded with ${res.status}: ${error}`);
            }

            const data = await res.json();
            console.log("✅ Message sent:", data);
            return data;
        } catch (err) {
            console.error("❌ Failed to send message:", err);
            return null;
        }
    };

    async function fetchMessages(roomId, token) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/message/${roomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ optional auth
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch messages (${response.status})`);
            }

            const data = await response.json();

            // DynamoDB items use { S: "value" } structure — flatten them
            const messages = (data.messages || []).map((msg) => ({
                username: msg.username?.S || "unknown",
                message: msg.message?.S || "",
                timestamp: msg.timestamp?.S || "",
                room: msg.room?.S || "",
            }));

            return messages;
        } catch (error) {
            console.error("❌ Error fetching messages:", error);
            return { success: false, messages: [] };
        }
    }
    return (
        <ChatContext.Provider value={{
            joinRoom,
            roomId,
            messages,
            addMessage,
            addServerMessage,
            addUserMessage,
            postMessage,
            clearMessages
        }}>
            {children}
        </ChatContext.Provider>
    );
};