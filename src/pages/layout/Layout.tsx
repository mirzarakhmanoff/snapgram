import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

const Layout = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <SideBar />
      </div>
      <div className=" w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
