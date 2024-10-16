import {
  useFollowMutation,
  useGetUserQuery,
  useUnfollowMutation,
} from "../../redux/api/register-api";

const Creators = () => {
  const { data, isLoading, error } = useGetUserQuery({ limit: 100 });
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const currentUserId = "670f437d9327e9451b09f8fa";
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading data</div>;

  const followUser = (username: string) => {
    follow(username);
  };
  const unfollowUser = (username: string) => {
    unfollow(username);
  };

  return (
    <div className="bg-black p-6">
      <h2 className="text-2xl text-white mb-4">Top Creators</h2>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((user: any) => (
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
            <p className="text-gray-400 text-[12px]">{user.email}</p>
            {user.followers?.some((item: any) => item._id === currentUserId) ? (
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
