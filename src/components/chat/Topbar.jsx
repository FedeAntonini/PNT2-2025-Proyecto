import UserMenu from "./UserMenu";
import logo from "../../assets/JustChatting.svg";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src={logo} alt="JustChatting" className="topbar-logo" />
      </div>
      <UserMenu />
    </div>
  );
}
