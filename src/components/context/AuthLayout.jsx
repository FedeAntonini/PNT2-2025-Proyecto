import { Outlet } from "react-router";
import { ChatProvider } from "./ChatProvider";

export default function AuthLayout() {
    return (
        <ChatProvider>
            <Outlet />
        </ChatProvider>
    );
}