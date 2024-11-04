import { useParams, Link } from "react-router-dom";
import { useGetuserProfileQuery } from "../../redux/api/register-api";
import FollowersItem from "../followersItem/FollowersItem";
import { Follower } from "../../types";

const Followers = () => {
  const { username } = useParams();
  const { data } = useGetuserProfileQuery(username);

  const count = data?.followers?.length || 0;

  return (
    <div className="mt-[50px] flex flex-col    h-screen">
      {count <= 0 ? (
        <div className="flex flex-col items-center text-gray-300">
          <p className="text-center text-lg mb-4 max-w-md">
            Вам еще ни кто не подписался! Подпишитесь чтобы лучше
            взаимодействовать
          </p>
          <Link
            to="/people"
            className="px-5 py-2 bg-[#877EFF] text-gray-200 rounded-full hover:bg-gray-600 transition-colors"
          >
            Подписаться
          </Link>
        </div>
      ) : (
        <div className="w-full flex flex-col ">
          {data?.followers.map((item: Follower) => (
            <FollowersItem key={item._id} data={item} count={count} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Followers;
