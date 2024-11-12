import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Union.svg";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import icon1 from "../../assets/Home.svg";
import icon2 from "../../assets/Users Group Rounded.svg";
import icon3 from "../../assets/Bookmark.svg";
import icon4 from "../../assets/Clapperboard Play.svg";
import icon5 from "../../assets/Chat Round Line.svg";
import icon6 from "../../assets/Gallery Add.svg";
import icon7 from "../../assets/Logout 3.svg";
import icon8 from "../../assets/Settings.svg";
import icon9 from "../../assets/Wallpaper.svg";
import { useGetProfileQuery } from "../../redux/api/register-api";
import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import UserProfile from "../userProfile/UserProfile";
import avatar from "../../assets/avatarka.jpg";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 700);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickOpen = () => setOpen((p) => !p);
  const handleClose = () => setOpen(false);
  const handleRemove = () => {
    localStorage.removeItem("token");
    window.location.reload();
    handleClose();
  };

  const { data } = useGetProfileQuery({});
  if (data) localStorage.setItem("user", JSON.stringify(data));
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div
      className={`bg-black p-4 fixed z-10 ${
        isLargeScreen
          ? "w-[80px] md:w-[270px] top-0 left-0 h-screen flex flex-col items-center md:items-start"
          : "bottom-0 left-0 w-full h-[60px] flex flex-row justify-around items-center "
      }`}
    >
      {isLargeScreen ? (
        <>
          <div className="mb-5 ">
            <Link to="/" className="flex gap-2 items-center text-white">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <p className="text-xl font-semibold hidden md:block">Snapgram</p>
            </Link>
          </div>
          <UserProfile
            userData={{
              username: data?.username,
              fullName: data?.fullName,
              photo: data?.photo,
            }}
            showFullName={true}
          />
        </>
      ) : (
        <div className="md:block hidden">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.photo?.includes("https") ? user.photo : avatar}
              alt="Profile"
              className="w-8 h-8 border rounded-full object-cover"
            />
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-col w-full gap-6 md:gap-3">
        <ul
          className={`${
            isLargeScreen ? "" : "flex flex-row justify-around w-full"
          }`}
        >
          {[
            { icon: icon1, label: "Home", to: "/" },
            { icon: icon9, label: "Explore", to: "/explore" },
            { icon: icon2, label: "People", to: "/people" },
            { icon: icon3, label: "Saved", to: "/saved" },
            { icon: icon4, label: "Reels", to: "/reels" },
            { icon: icon5, label: "Chats", to: "/chats" },
            { icon: icon6, label: "Create Post", to: "/new-post" },
          ].map(({ icon, label, to }, index) => (
            <li key={index} className={`${isLargeScreen ? "mb-3" : ""}`}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-[8px] transition-colors ${
                    isActive
                      ? "bg-[#877EFF] text-white"
                      : "text-white hover:bg-[#877EFF] hover:text-white"
                  } ${isLargeScreen ? "" : "flex-col text-center"}`
                }
              >
                <img src={icon} alt={label} className="w-6 h-6" />
                {isLargeScreen && (
                  <span className="hidden md:block">{label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <ul
            className={`flex ${isLargeScreen ? "flex-col" : "flex-row"} gap-3`}
          >
            <li
              onClick={handleClickOpen}
              className="p-3 rounded-[8px] hover:bg-[#877EFF]"
            >
              <button className="flex items-center gap-3 text-white">
                <img src={icon7} alt="Logout" className="w-6 h-6" />
                {isLargeScreen && (
                  <span className="hidden md:block">Logout</span>
                )}
              </button>
            </li>
            <li className="p-3 rounded-[8px] hover:bg-[#877EFF]">
              <NavLink
                to="/settings"
                className="flex items-center gap-3 text-white"
              >
                <img src={icon8} alt="Settings" className="w-6 h-6" />
                {isLargeScreen && (
                  <span className="hidden md:block">Settings</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemove} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SideBar;
