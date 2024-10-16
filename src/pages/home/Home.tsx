import Creators from "../../components/creators/Creators";
import SideBar from "../../components/SideBar/SideBar";
import Stories from "../../components/stories/Stories";

const Home = () => {
  return (
    <div className="flex bg-black">
      <div className="w-[270px] h-screen fixed left-0 top-0">
        <SideBar />
      </div>

      <div className="flex-1 ml-[270px] mr-[465px] pt-6">
        {" "}
        <Stories />
        {/* <HomeFeed /> */}
      </div>

      <div className="w-[465px] h-screen fixed overflow-scroll right-0 top-0">
        <Creators />
      </div>
    </div>
  );
};

export default Home;
