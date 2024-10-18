import post1 from "../../assets/storiImg2.jpeg";
import post2 from "../../assets/storyImg4.jpeg";

const YourTopPost = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-10">
      {/* Аватар пользователя */}
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img
          src={post2} // Замените на ваш URL изображения
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Имя пользователя */}
      <h1 className="text-white text-xl font-semibold">Lewis Hamilton</h1>
      <p className="text-gray-400">@Lewishamilton</p>

      {/* Топ посты */}
      <div className="mt-6 w-full max-w-sm">
        <h2 className="text-white text-lg mb-4">Top posts by you</h2>

        {/* Посты (изображения) */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={post1}
              alt="Post 1"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
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
          {/* <div className="relative rounded-lg overflow-hidden">
            <img
              src={post2} // Замените на ваш URL изображения
              alt="Post 2"
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-2 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default YourTopPost;
