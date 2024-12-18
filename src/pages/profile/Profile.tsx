import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  useFollowMutation,
  useGetuserProfileQuery,
  useUnfollowMutation,
} from "../../redux/api/register-api";
import Posts from "../../components/posts/Posts";
import avatar from "../../assets/avatarka.jpg";

const Profile: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetuserProfileQuery(userId);

  const currentUser = JSON.parse(localStorage.getItem("user") as string);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen p-6 absolute  left-[300px] animate-pulse">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-6 w-32 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>

        <div className="flex space-x-12 mt-6 text-gray-300">
          <div className="h-8 w-12 bg-gray-700 rounded"></div>
          <div className="h-8 w-12 bg-gray-700 rounded"></div>
          <div className="h-8 w-12 bg-gray-700 rounded"></div>
        </div>

        <div className="mt-6">
          <div className="h-4 w-48 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-60 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-700 rounded"></div>
        </div>

        <div className="flex gap-5 my-8 space-x-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-700 rounded-full"
            ></div>
          ))}
        </div>
      </div>
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
    <div className="bg-black text-white min-h-screen p-6 absolute md:left-[300px]">
      <div className="flex  space-x-6 flex-col md:flex-row items-start justify-center md:justify-start md:items-center ">
        <div className="flex gap-2 items-center justify-center ">
          <div className="md:w-20 md:h-20 w-14 h-12 mb-3 border rounded-full bg-white overflow-hidden flex justify-center items-center">
            <img
              src={data?.photo?.includes("https") ? data.photo : avatar}
              alt="Profile photo"
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center justify-start ">
              <h1 className=" font-bold text-sm md:text-2xl">
                {data?.fullName}
              </h1>
              <FaCheckCircle className="text-blue-500" />
            </div>
            <p className="text-gray-400 ">{`@ ${data?.username}`}</p>
          </div>
        </div>
        {data._id === currentUser._id ? (
          <button className="flex items-center text-white rounded-lg px-4 py-2 transition duration-200 hover:text-[#FFA700] hover:shadow-lg">
            <FaEdit className="mr-2 text-[#ffa700]" />
            <span className="hidden  md:block"> Edit Profile</span>
          </button>
        ) : (
          <div className=" ">
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
                className="mt-2 bg-purple-600 text-white px-4 py-1 hover:bg-purple-700 transition-all"
              >
                Follow
              </button>
            )}
            <button className="border border-gray-500 px-4 py-1 ml-[10px] rounded-lg">
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
          {data.followers.length <= 0 ? (
            <div>
              <span className="block text-lg font-bold text-white">
                {data?.followers.length}
              </span>
              <span>Followers</span>
            </div>
          ) : (
            <Link to={`/followers/${data.username}`}>
              <span className="block text-lg font-bold text-white">
                {data?.followers.length}
              </span>
              <span>Followers</span>
            </Link>
          )}
        </div>
        <div>
          {data.following.length <= 0 ? (
            <div>
              <span className="block text-lg font-bold text-white">
                {data?.following.length}
              </span>
              <span>Following</span>
            </div>
          ) : (
            <Link to={`/following/${data.username}`}>
              <span className="block text-lg font-bold text-white">
                {data?.following.length}
              </span>
              <span>Following</span>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 text-gray-400">
        <p>For Developers, By Developers</p>
        <p>💻 Web Development & Coding</p>
        <p>📺 YouTube - JavaScript Mastery</p>
        <p>📧 Business Inquiries - Email or DM</p>
      </div>

      <div className="flex gap-5 my-8 space-x-4  overflow-x-auto whitespace-nowrap w-[300px]">
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

      <Posts data={data} userId={userId} isloading={isLoading} />
    </div>
  );
};

export default Profile;
