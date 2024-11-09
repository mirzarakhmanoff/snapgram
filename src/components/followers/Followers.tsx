import { useParams } from "react-router-dom";
import { useGetuserProfileQuery } from "../../redux/api/register-api";
import FollowersItem from "../followersItem/FollowersItem";
import { Follower } from "../../types";

const Followers = () => {
  const { username } = useParams();
  const { data } = useGetuserProfileQuery(username);

  const count = data?.followers?.length || 0;

  return (
    <div className="mt-[50px] flex flex-col    h-screen">
      <div className="w-full flex flex-col ">
        {data?.followers.map((item: Follower) => (
          <FollowersItem key={item._id} data={item} count={count} />
        ))}
      </div>
    </div>
  );
};

export default Followers;
