import { useNavigate } from "react-router-dom";
import Creators from "../../components/creators/Creators";
import Stories from "../../components/stories/Stories";
import { useGetUserQuery } from "../../redux/api/register-api";
import HomeFeed from "../../components/HomeFeed/HomeFeed";
import { useEffect } from "react";

const Home = () => {
  const { data: creators, isLoading, error } = useGetUserQuery({ limit: 10 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const token = localStorage.getItem("token");
    const originalToken = localStorage.getItem("token");
    if (token && token !== originalToken) {
      navigate("/login");
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  if (error) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex bg-black">
      <div className="flex-1 ml-[100px] md:ml-[270px] md:mr-[465px] pt-6">
        <Stories />
        <HomeFeed />
      </div>

      <div className="hidden lg:block w-[465px]  h-screen fixed overflow-scroll right-0 top-0">
        <Creators
          creators={creators}
          error={error}
          isLoading={isLoading}
          title={"New Users"}
        />
      </div>
    </div>
  );
};

export default Home;
