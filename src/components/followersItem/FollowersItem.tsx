import { Link } from "react-router-dom";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../../redux/api/register-api";
import { Follower } from "../../types";
import avatarka from "../../assets/avatarka.jpg";
const FollowersItem = ({ data, count, refetch }: any) => {
  const currentUser = JSON.parse(localStorage.getItem("user") as string);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const followUser = async (username: string) => {
    await follow(username);
    refetch();
  };

  const unfollowUser = async (username: string) => {
    await unfollow(username);
    refetch();
  };

  return (
    <>
      {count <= 0 ? (
        <div className="flex items-center p-5 bg-gray-800 shadow-lg rounded-xl max-w-md ml-[50px] mb-6 transform hover:scale-105 transition-transform duration-200">
          <p className="text-white text-3xl">Salom</p>
        </div>
      ) : (
        <div className="flex items-center p-5 bg-gray-800 shadow-lg rounded-xl max-w-md ml-[50px] mb-6 transform transition-transform duration-200">
          <Link
            to={`/profile/${data?.username}`}
            className="flex items-center space-x-4"
          >
            <img
              src={data?.photo.includes("https") ? data?.photo : avatarka}
              alt={data?.username}
              className="w-14 h-14 rounded-full border-2 border-gray-700 shadow-sm"
            />
            <div>
              <h5 className="text-lg font-semibold text-white">
                {data?.firstname}
              </h5>
              <span className="text-gray-400">@{data?.username}</span>
            </div>
          </Link>
          <div className="ml-auto flex items-center space-x-3">
            {data?._id === currentUser._id ? (
              <button className="border border-gray-600 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-700 hover:text-white transition-colors">
                Message
              </button>
            ) : (
              <>
                {currentUser?.following.some(
                  (current: Follower) => current._id === data._id
                ) ? (
                  <button
                    onClick={() => unfollowUser(data.username)}
                    className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700 transition-colors"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => followUser(data.username)}
                    className="bg-purple-600 text-white px-4 py-1 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    Follow
                  </button>
                )}
                <button className="border border-gray-600 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-700 hover:text-white transition-colors">
                  Message
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FollowersItem;
