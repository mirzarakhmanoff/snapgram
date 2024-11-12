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
import React, { useState } from "react";
import UserProfile from "../userProfile/UserProfile";
import avatar from "../../assets/avatarka.jpg";

const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const [isLargeScreen] = useState(window.innerWidth > 700);

  const handleClickOpen = () => {
    setOpen((p) => !p);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    localStorage.removeItem("token");
    window.location.reload();
    handleClose();
  };

  const { data } = useGetProfileQuery({});

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="bg-black p-4  w-[80px] md:w-[270px] fixed top-0 left-0 h-screen flex flex-col  justify-center items-center md:items-start">
      {" "}
      <div className="mb-5">
        <Link to="/" className="flex gap-2 items-center text-white">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <p className="text-xl font-semibold hidden md:block">Snapgram</p>{" "}
        </Link>
      </div>
      {isLargeScreen ? (
        <UserProfile
          userData={{
            username: data?.username,
            fullName: data?.fullName,
            photo: data?.photo,
          }}
          showFullName={true}
        />
      ) : (
        <Link to={`/profile/${user.username}`}>
          <div className=" mb-2">
            <img
              src={user.photo?.includes("https") ? user.photo : avatar}
              alt="Profile"
              className="w-8 h-8 border rounded-full object-cover"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col w-full gap-6">
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
            <li key={index} className="mb-3">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-[8px] transition-colors ${
                    isActive
                      ? "bg-[#877EFF] text-white"
                      : "text-white hover:bg-[#877EFF] hover:text-white"
                  }`
                }
              >
                <img src={icon} alt={label} className="w-6 h-6" />
                <span className="hidden md:block">{label}</span>{" "}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-3">
          <li
            onClick={handleClickOpen}
            className="p-3 border border-transparent rounded-[8px] hover:bg-[#877EFF] hover:border-white"
          >
            <button className="flex items-center gap-3 text-white transition-colors">
              <img src={icon7} alt="Logout" className="w-6 h-6" />
              <span className="hidden md:block">Logout</span>{" "}
            </button>
          </li>
          <li className="p-3 border border-transparent rounded-[8px] hover:bg-[#877EFF] hover:border-white">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 text-white transition-colors group"
            >
              <img
                src={icon8}
                alt="Settings"
                className="w-6 h-6 group-hover:brightness-0 group-hover:invert"
              />
              <span className="hidden md:block">Settings</span>{" "}
            </NavLink>
          </li>
        </ul>
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
