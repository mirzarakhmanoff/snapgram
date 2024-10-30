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
    <div className="p-4 ">
      <Link to={`${linkPrefix}/${username || "username"}`}>
        <div className="flex items-center gap-4">
          <img
            src={photo?.includes("https") ? photo : avatar}
            alt="Profile"
            className="w-16 h-16 border rounded-full object-cover"
          />

          <div className="hidden sm:block">
            {showFullName && (
              <h5 className="text-[12px] font-semibold text-white">
                {fullName || "Unknown User"}
              </h5>
            )}
            <span className="text-[18px] text-gray-300 ">
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
