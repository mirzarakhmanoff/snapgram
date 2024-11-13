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
import { useState } from "react";
import UserProfile from "../userProfile/UserProfile";

const SideBar = () => {
  const [open, setOpen] = useState(false);

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
    <div className="bg-black p-4 fixed z-10 w-full md:w-[270px] bottom-0 md:top-0 left-0 h-[60px] md:h-screen flex flex-row md:flex-col justify-around md:items-start items-center">
      <div className="hidden md:flex mb-5">
        <Link to="/" className="flex gap-2 items-center text-white">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <p className="text-xl font-semibold hidden md:block">Snapgram</p>
        </Link>
      </div>
      <div className="md:block hidden">
        <Link to={`/profile/${user.username}`}>
          <UserProfile
            userData={{
              username: user.username,
              photo: user.photo,
              createdAt: user.fullName,
            }}
            showFullName={false}
            showDate={true}
          />
        </Link>
      </div>

      <ul className="flex md:flex-col gap-1  md:gap-3 w-full justify-around md:justify-start">
        {[
          { icon: icon1, label: "Home", to: "/" },
          { icon: icon9, label: "Explore", to: "/explore" },
          { icon: icon2, label: "People", to: "/people" },
          { icon: icon3, label: "Saved", to: "/saved" },
          { icon: icon4, label: "Reels", to: "/reels" },
          { icon: icon5, label: "Chats", to: "/chats" },
          { icon: icon6, label: "Create Post", to: "/new-post" },
        ].map(({ icon, label, to }, index) => (
          <li key={index}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive
                    ? "bg-[#877EFF] text-white"
                    : "text-white hover:bg-[#877EFF] hover:text-white"
                } ${
                  index < 7 ? "flex-col text-center md:flex-row gap-2 p-3" : ""
                } rounded-[8px]`
              }
            >
              <img src={icon} alt={label} className="w-6 h-6" />
              <span className="hidden md:block">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="hidden md:block mt-auto">
        <ul className="flex flex-col gap-3">
          <li
            onClick={handleClickOpen}
            className="p-3 rounded-[8px] hover:bg-[#877EFF]"
          >
            <button className="flex items-center gap-3 text-white">
              <img src={icon7} alt="Logout" className="w-6 h-6" />
              <span className="hidden md:block">Logout</span>
            </button>
          </li>
          <li className="p-3 rounded-[8px] hover:bg-[#877EFF]">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 text-white"
            >
              <img src={icon8} alt="Settings" className="w-6 h-6" />
              <span className="hidden md:block">Settings</span>
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
