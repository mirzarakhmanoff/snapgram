import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  useFollowMutation,
  useGetuserProfileQuery,
  useUnfollowMutation,
} from "../../redux/api/register-api";
import Posts from "../../components/posts/Posts";

const Profile: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetuserProfileQuery(userId);
  const currentUser = JSON.parse(localStorage.getItem("user") as string);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mx-auto my-auto mt-[200px]"></div>
    );
  }
  if (error || !data) return <p>Error loading profile.</p>;

  const followUser = async (username: string) => {
    await follow(username);
  };

  const unfollowUser = async (username: string) => {
    await unfollow(username);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 absolute left-[300px]">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-white  overflow-hidden flex justify-center items-center">
          <img src={data?.photo} alt="" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{data?.fullName}</h1>
            <FaCheckCircle className="text-blue-500" />
          </div>
          <p className="text-gray-400">{`@ ${data?.username}`}</p>
        </div>
        {data._id === currentUser._id ? (
          <></>
        ) : (
          <div className="ml-auto space-x-4">
            {data.followers.some(
              (follower: any) => follower._id === currentUser._id
            ) ? (
              <button
                onClick={() => unfollowUser(data.username)}
                className="mt-2 bg-red-600 text-white px-4 py-1 hover:bg-red-700 transition-all"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUser(data.username)}
                className="mt-2 bg-purple-600 text-white  px-4 py-1 hover:bg-purple-700 transition-all"
              >
                Follow
              </button>
            )}
            <button className="border border-gray-500 px-4 py-2 rounded-lg">
              Message
            </button>
          </div>
        )}
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

      <div className="flex gap-5  my-8 space-x-4">
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
      <Posts data={data} userId={userId} />
    </div>
  );
};

export default Profile;
