import { GiHamburgerMenu } from "react-icons/gi";
import Post from "../post/Post";

const HomeFeed = () => {
  return (
    <div>
      <div className="text-white flex items-center justify-between">
        <h2 className="text-[30px]">Home Feed</h2>
        <div className=" flex items-center">
          <span>All</span>
          <GiHamburgerMenu />
        </div>
      </div>
      <Post />
    </div>
  );
};

export default HomeFeed;
