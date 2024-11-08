import React from "react";
import avatar from "../../assets/avatarka.jpg";
interface ChatUsers {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

const chatUsers: ChatUsers[] = [
  {
    id: 1,
    name: "JavaScript Mastery",
    username: "@javascriptmastery",
    avatar: "path/to/avatar1.jpg",
    isOnline: true,
  },
  {
    id: 2,
    name: "Lewis Hamilton",
    username: "@lewishamilton",
    avatar: "path/to/avatar2.jpg",
    isOnline: true,
  },
  {
    id: 3,
    name: "Olivia Rose",
    username: "@oliviarose",
    avatar: "path/to/avatar3.jpg",
    isOnline: false,
  },
  {
    id: 4,
    name: "William Luis",
    username: "@willianluis",
    avatar: "path/to/avatar4.jpg",
    isOnline: true,
  },
  {
    id: 5,
    name: "Emma Lana",
    username: "@emmalana",
    avatar: "path/to/avatar5.jpg",
    isOnline: false,
  },
  {
    id: 6,
    name: "Benjamin Doe",
    username: "@doebenjamin",
    avatar: "path/to/avatar6.jpg",
    isOnline: true,
  },
  {
    id: 7,
    name: "Elizabeth Waise",
    username: "@davidddwas",
    avatar: "path/to/avatar7.jpg",
    isOnline: false,
  },
];

const ChatUsers: React.FC = () => {
  return (
    <div className="bg-black min-h-screen p-4 text-white">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="inline-block p-2 bg-white rounded-full text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m6 4h2m-6 4h2m-6 4h.01"
            />
          </svg>
        </span>
        All Chats
      </h2>
      <div className="mt-4">
        {chatUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-10 mb-[20px] py-3 border-b border-gray-700"
          >
            <img
              src={avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-bold">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.username}</p>
            </div>
            <span
              className={`w-3 h-3 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-500"
              }`}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
