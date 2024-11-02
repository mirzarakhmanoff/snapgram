import { useParams } from "react-router-dom";
import { useGetuserProfileQuery } from "../../redux/api/register-api";
import FollowersItem from "./FOllowersItem";

const Followers = () => {
  const id = useParams();
  console.log(id.username);

  const { data } = useGetuserProfileQuery(id.username);
  console.log(data);

  return (
    <div className="mt-[50px]">
      {data?.followers.map((item: any) => (
        <FollowersItem data={item} />
      ))}
    </div>
  );
};

export default Followers;
