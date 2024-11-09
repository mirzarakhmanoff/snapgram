import { useParams } from "react-router-dom";
import { useGetuserProfileQuery } from "../../redux/api/register-api";
import FollowersItem from "../followersItem/FollowersItem";
import { Follower } from "../../types";

const Following = () => {
  const { username } = useParams();
  const { data, refetch } = useGetuserProfileQuery(username);

  const count = data?.following?.length || 0;

  return (
    <div className="mt-[50px] flex flex-col items-center h-screen">
      <div className="w-full items-start justify-start ">
        {data?.following.map((item: Follower) => (
          <FollowersItem
            key={item._id}
            data={item}
            count={count}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default Following;
