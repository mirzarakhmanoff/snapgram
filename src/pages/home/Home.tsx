import { useNavigate } from "react-router-dom";
import Creators from "../../components/creators/Creators";
import Stories from "../../components/stories/Stories";
import { useGetUserQuery } from "../../redux/api/register-api";
import HomeFeed from "../../components/HomeFeed/HomeFeed";

const Home = () => {
  const { data: creators, isLoading, error } = useGetUserQuery({ limit: 100 });
  const navigate = useNavigate();

  if (error) navigate("/login");
  if (isLoading) return <>loading...</>;

  return (
    <div className="flex bg-black">
      <div className="flex-1 ml-[270px] mr-[465px] pt-6">
        {" "}
        <Stories />
        <HomeFeed />
      </div>

      <div className="w-[465px] h-screen fixed overflow-scroll right-0 top-0">
        <Creators creators={creators} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
