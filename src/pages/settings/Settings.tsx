import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import avatar from "../../assets/avatarka.jpg";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  const [name, setName] = useState(user?.fullName || "Lewis Hamilton");
  const [username, setUsername] = useState(user?.username || "@LewisHamilton");
  const [email, setEmail] = useState(user?.email || "lewishamilton@mail.com");
  const [bio, setBio] = useState(
    user?.bio ||
      "🌿 Capturing the essence of nature through my lens\n✨ 'In every walk with nature, one receives far more than he seeks.' - John Muir"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex items-center ml-[50px] bg-black">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <FaEdit className="text-white text-2xl" />
          <h1 className="text-white text-2xl font-bold">Edit Profile</h1>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.photo?.includes("https") ? user.photo : avatar}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleClick}
            className="text-blue-500 relative cursor-pointer"
          >
            Change profile photo
            <input
              type="file"
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-gray-900 text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
            rows={4}
          />
        </div>

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
