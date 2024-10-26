import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[90px]  md:w-[300px]">
        <SideBar />
      </div>
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
