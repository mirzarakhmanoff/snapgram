import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
  return (
    <div className="flex items-center justify-center">
      <SideBar />
      <div className="w-full relative ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
