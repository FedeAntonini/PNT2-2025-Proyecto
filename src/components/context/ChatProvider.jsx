import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";

export const ChatProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const status = user !== null && token !== null;
        setIsAuthenticated(status);
        console.log("Authenticated:", status);
    }, [user, token]);

    return (
        <ChatContext.Provider value={{ isAuthenticated }}>
            {children}
        </ChatContext.Provider>
    );
};