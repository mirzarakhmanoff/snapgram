import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Union.svg";
import profile from "../../assets/profile.png";

import icon1 from "../../assets/Home.svg";
import icon2 from "../../assets/Users Group Rounded.svg";
import icon3 from "../../assets/Bookmark.svg";
import icon4 from "../../assets/Clapperboard Play.svg";
import icon5 from "../../assets/Chat Round Line.svg";
import icon6 from "../../assets/Gallery Add.svg";
import icon7 from "../../assets/Logout 3.svg";
import icon8 from "../../assets/Settings.svg";
import icon9 from "../../assets/Wallpaper.svg";

const SideBar = () => {
  return (
    <div className="bg-black h-screen w-64 p-6 ">
      <div className="mb-5 ">
        <Link to={"/"} className="flex gap-2 items-center text-white">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <p className="text-xl font-semibold">Snapgram</p>
        </Link>
      </div>
      <div className="flex items-center  mb-3 gap-3">
        <div>
          <img src={profile} alt="Profile" className="w-12 h-12 rounded-full" />
        </div>
        <div className="text-center">
          <h5 className="text-[16px] text-white font-semibold">
            Lewis Hamilton
          </h5>
          <a href="#" className="text-gray-400 text-sm">
            @Lewishamilton
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <ul className="mb-4">
          {[
            { icon: icon1, label: "Home", to: "/" },
            { icon: icon9, label: "Explore", to: "/explore" },
            { icon: icon2, label: "People", to: "/people" },
            { icon: icon3, label: "Saved", to: "/saved" },
            { icon: icon4, label: "Reels", to: "/reels" },
            { icon: icon5, label: "Chats", to: "/chats" },
            { icon: icon6, label: "Create Post", to: "/new-post" },
          ].map(({ icon, label, to }, index) => (
            <li
              key={index}
              className="mb-3 p-3 border border-transparent rounded-[8px] hover:bg-[#877EFF] hover:border-white"
            >
              <NavLink
                to={to}
                className="flex items-center gap-3 text-white transition-colors"
              >
                <img src={icon} alt={label} className="w-6 h-6" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-3">
          <li className="p-3 border border-transparent rounded-[8px] hover:bg-[#877EFF] hover:border-white">
            <NavLink
              to={"/logout"}
              className="flex items-center gap-3 text-white transition-colors"
            >
              <img src={icon7} alt="Logout" className="w-6 h-6" />
              <span>Logout</span>
            </NavLink>
          </li>
          <li className="p-3 border border-transparent rounded-[8px] hover:bg-[#877EFF] hover:border-white">
            <NavLink
              to={"/settings"}
              className="flex items-center gap-3 text-white transition-colors"
            >
              <img src={icon8} alt="Settings" className="w-6 h-6" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
