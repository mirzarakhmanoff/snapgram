import ChatMessages from "../../components/chatMessages/ChatMessages";
import ChatUsers from "../../components/chatUsers/ChatUsers";

function Chats() {
  return (
    <div className="ml-[50px] text-white flex gap-[50px]">
      <div className="w-[400px]">
        <ChatUsers />
      </div>
      <div className="h-screen flex flex-col">
        <ChatMessages />
      </div>
    </div>
  );
}

export default Chats;
