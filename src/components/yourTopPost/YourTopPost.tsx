import post1 from "../../assets/storiImg2.jpeg";
import profileimg from "../../assets/avatarka.jpg";

const YourTopPost = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="min-h-screen bg-black hidden md:flex flex-col items-center ml-[80px]  md:pt-10  ">
      <div className="w-32 h-32 rounded-full mb-4">
        <img
          src={user?.photo?.includes("https") ? user?.photo : profileimg}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <h1 className="text-white text-xl font-semibold text-center">
        {user.fullName}
      </h1>
      <p className="text-gray-400 text-center">{user.username}</p>

      <div className="mt-6 w-full max-w-sm">
        <h2 className="text-white text-lg mb-4">Top posts by you</h2>

        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={post1}
              alt="Post 1"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourTopPost;
