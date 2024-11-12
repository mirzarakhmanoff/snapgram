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

  return (
    <div className="flex flex-col md:flex-row bg-black">
      <div className="flex-1 md:ml-[300px] ml-0 rounded-lg text-[#001011] md:mr-[465px] pt-6">
        <Stories />
        <HomeFeed />
      </div>

      <div className="hidden md:block md:w-[250px] lg:w-[350px] xl:w-[465px] h-screen fixed overflow-scroll right-0 top-0">
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
