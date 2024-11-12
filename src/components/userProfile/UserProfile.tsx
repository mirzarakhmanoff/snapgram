import { Link } from "react-router-dom";
import avatar from "../../assets/avatarka.jpg";
import { UserProfileProps } from "../../types";

const UserProfile: React.FC<UserProfileProps> = ({
  userData,
  linkPrefix = "/profile",
  showFullName = true,
  showDate = false,
}) => {
  const { username, fullName, photo, createdAt } = userData;

  return (
    <div>
      <Link to={`${linkPrefix}/${username || "username"}`}>
        <div className="flex items-center gap-4 mb-2 ">
          <img
            src={photo?.includes("https") ? photo : avatar}
            alt="Profile"
            className="w-12 h-12 border rounded-full object-cover"
          />

          <div className="hidden sm:block">
            {showFullName && (
              <h5 className="text-[12px] font-semibold text-white">
                {fullName || "Unknown User"}
              </h5>
            )}
            <span className="text-[14px]  text-gray-300 ">
              @{username || "username"}
            </span>
            {showDate && (
              <span className="block text-xs text-gray-400 mt-1">
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
