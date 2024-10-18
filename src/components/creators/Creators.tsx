import {
  useFollowMutation,
  useUnfollowMutation,
} from "../../redux/api/register-api";
import { FC } from "react";

interface CreatorsProps {
  creators: any[];
  error: any;
  isLoading: boolean;
}

const Creators: FC<CreatorsProps> = ({ creators, error, isLoading }) => {
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const truncateString = (str: string, num: number) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  if (isLoading) return <>loading...</>;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = user?._id;

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading data</div>;

  const followUser = async (username: string) => {
    await follow(username);
  };

  const unfollowUser = async (username: string) => {
    await unfollow(username);
  };

  return (
    <div className="bg-black p-6">
      <h2 className="text-2xl text-white mb-4">Top Creators</h2>
      <div className="grid grid-cols-2 gap-4">
        {creators?.map((user: any) => (
          <div
            key={user._id}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={
                user.photo ||
                "//i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
              }
              alt={user.name}
              className="w-24 h-24 rounded-full mb-2"
            />
            <h3 className="text-white">{user.username}</h3>
            <p className="text-gray-400">{truncateString(user.email, 20)} </p>

            {user.followers?.some(
              (follower: any) => follower._id === currentUserId
            ) ? (
              <button
                onClick={() => unfollowUser(user.username)}
                className="mt-2 bg-red-600 text-white rounded-full px-4 py-1 hover:bg-red-700 transition-all"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUser(user.username)}
                className="mt-2 bg-purple-600 text-white rounded-full px-4 py-1 hover:bg-purple-700 transition-all"
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creators;
