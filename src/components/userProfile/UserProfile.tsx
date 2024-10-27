import { Link } from "react-router-dom";
import avatar from "../../assets/avatarka.jpg";

interface UserData {
  username: string;
  fullName?: string;
  photo?: string;
  createdAt?: string;
}

interface UserProfileProps {
  userData: UserData;
  linkPrefix?: string;
  showFullName?: boolean;
  showDate?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userData,
  linkPrefix = "/profile",
  showFullName = true,
  showDate = false,
}) => {
  const { username, fullName, photo, createdAt } = userData;

  return (
    <div className="my-4">
      <Link to={`${linkPrefix}/${username || "username"}`}>
        <div className="post-header flex items-center mb-2 gap-3">
          <img
            src={photo?.includes("https") ? photo : avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            {showFullName && (
              <h5 className="text-[10px] text-white font-semibold hidden md:block">
                {fullName || "Unknown User"}
              </h5>
            )}
            <span className="user-name font-semibold text-white text-sm sm:text-base">
              @{username || "username"}
            </span>
            {showDate && (
              <span className="date text-gray-400 text-xs sm:text-sm block">
                {createdAt}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserProfile;
