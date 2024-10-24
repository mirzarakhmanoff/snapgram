import { Link } from "react-router-dom";
import {
  useFollowMutation,
  useUnfollowMutation,
} from "../../redux/api/register-api";
import { FC } from "react";

import profileimg from "../../assets/avatarka.jpg";

interface CreatorsProps {
  creators: any[];
  error: any;
  isLoading: boolean;
  title: string;
  length: any;
}

const Creators: FC<CreatorsProps> = ({
  creators,
  error,
  isLoading,
  title,
  length,
}) => {
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const onCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert(`Copied ${email}`);
  };

  function truncateString(email: string) {
    const [localPart, domain] = email.split("@");

    if (localPart.length <= 6) {
      return email;
    }

    const firstThree = localPart.slice(0, 3);
    const lastTwo = localPart.slice(-2);

    return `${firstThree}...${lastTwo}@${domain}`;
  }

  const SkeletonLoader = () => (
    <div className="bg-gray-700 animate-pulse rounded-lg p-4 flex flex-col items-center text-center w-[180px] h-[280px]">
      <div className="w-24 h-24 bg-gray-600 rounded-full mb-4"></div>
      <div className="w-16 h-4 bg-gray-600 mb-2"></div>
      <div className="w-32 h-4 bg-gray-600 mb-4"></div>
      <div className="w-24 h-6 bg-gray-600 rounded-full"></div>
    </div>
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = user?._id;

  if (error) return <div className="text-red-500">Error loading data</div>;

  const followUser = async (username: string) => {
    await follow(username);
  };

  const unfollowUser = async (username: string) => {
    await unfollow(username);
  };

  return (
    <div className="bg-black p-6">
      <h2 className="text-2xl text-white mb-4">{title}</h2>

      {isLoading ? (
        <div className="flex flex-wrap gap-5 items-center justify-between">
          {Array(length || 10)
            .fill(0)
            .map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 items-center justify-between">
          {creators?.map((user: any) => (
            <div
              key={user._id}
              className="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center w-[180px]"
            >
              <Link to={`/profile/${user?.username}`}>
                <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center w-[180px]">
                  <img
                    src={
                      user?.photo?.includes("https") ? user?.photo : profileimg
                    }
                    alt={user.name}
                    className="w-24 h-24 rounded-full mb-2"
                  />
                  <h3 className="text-white">{user.username}</h3>
                </div>
              </Link>
              <p
                onClick={() => onCopyEmail(user.email)}
                title={user.email}
                className="text-gray-400 cursor-pointer"
              >
                {truncateString(user.email)}{" "}
              </p>

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
      )}
    </div>
  );
};

export default Creators;
