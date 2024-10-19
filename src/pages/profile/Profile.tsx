import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetuserProfileQuery } from "../../redux/api/register-api";

const Profile: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetuserProfileQuery(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading profile.</p>;

  console.log(data);

  return (
    <div className="bg-black text-white min-h-screen p-6 absolute left-[300px]">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
          <img src={data?.photo} alt="" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{data?.fullName}</h1>
            <FaCheckCircle className="text-blue-500" />
          </div>
          <p className="text-gray-400">{`@ ${data?.username}`}</p>
        </div>
        <div className="ml-auto space-x-4">
          <button className="bg-blue-600 px-4 py-2 rounded-lg">Follow</button>
          <button className="border border-gray-500 px-4 py-2 rounded-lg">
            Message
          </button>
        </div>
      </div>

      <div className="flex space-x-12 mt-6 text-gray-300">
        <div>
          <span className="block text-lg font-bold text-white">
            {data?.posts.length}
          </span>
          <span>Posts</span>
        </div>
        <div>
          <span className="block text-lg font-bold text-white">
            {" "}
            {data?.followers.length}
          </span>
          <span>Followers</span>
        </div>
        <div>
          <span className="block text-lg font-bold text-white">
            {data?.following.length}
          </span>
          <span>Following</span>
        </div>
      </div>

      <div className="mt-6 text-gray-400">
        <p>For Developers, By Developers</p>
        <p>💻 Web Development & Coding</p>
        <p>📺 YouTube - JavaScript Mastery</p>
        <p>📧 Business Inquiries - Email or DM</p>
      </div>

      <div className="flex justify-between mt-8 space-x-4">
        {[
          "JSM Pro",
          "React Course",
          "Web3 Course",
          "JS Course",
          "Good",
          "FAQ",
        ].map((label, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex justify-center items-center text-xl text-gray-400">
              <span>{label.split(" ")[0]}</span>
            </div>
            <span className="text-sm text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
