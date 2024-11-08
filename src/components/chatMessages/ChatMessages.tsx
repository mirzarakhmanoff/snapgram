import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsFillMicFill } from "react-icons/bs";
import avatar from "../../assets/avatarka.jpg";
import { FaVideo } from "react-icons/fa";
import { MdCall } from "react-icons/md";

interface Message {
  text: string;
  time: string;
  sender: "user" | "contact";
}

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey There!", time: "Today, 2:01pm", sender: "contact" },
    { text: "How are you doing?", time: "Today, 2:02pm", sender: "contact" },
    { text: "Hello...", time: "Today, 2:12pm", sender: "user" },
    {
      text: "I am good and how about you?",
      time: "Today, 2:12pm",
      sender: "user",
    },
    {
      text: "I am doing well. Can we meet up tomorrow?",
      time: "Today, 2:13pm",
      sender: "contact",
    },
    { text: "Sure!", time: "Today, 2:14pm", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "user",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className=" h-screen bg-black rounded-lg shadow-lg p-4 min-w-[600px]">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-white font-bold">JavaScript Mastery</p>
          <p className="text-gray-400 text-sm">Online</p>
        </div>
        <div className="ml-auto flex gap-2 text-gray-400">
          <button>
            <FaVideo />
          </button>
          <button>
            <MdCall />
          </button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 h-[550px] rounded-lg overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
            <p className="text-gray-400 text-xs mt-1">{msg.time}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-lg">
        <BsFillMicFill className="text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Write your message here..."
          className="flex-1 bg-gray-900 text-white outline-none placeholder-gray-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="bg-yellow-500 p-2 rounded-full">
          <FiSend className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
