import stories1 from "../../assets/storyImg.jpeg";
import stories2 from "../../assets/storiImg2.jpeg";
import stories3 from "../../assets/storyImg2.jpeg";
import stories4 from "../../assets/storyImg3.jpeg";
import stories5 from "../../assets/storyImg4.jpeg";
import stories6 from "../../assets/storyImg5.jpeg";
import { UserItems } from "../../types";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";

const users: UserItems[] = [
  { id: 1, img: stories1, nickname: "My Story" },
  { id: 2, img: stories2, nickname: "John" },
  { id: 3, img: stories3, nickname: "Anna" },
  { id: 4, img: stories4, nickname: "Mike" },
  { id: 5, img: stories5, nickname: "Sara" },
  { id: 6, img: stories6, nickname: "Tom" },
];

const SkeletonLoader = () => (
  <div className="border-4 border-gray-600 w-[72px] h-[72px] rounded-full overflow-hidden animate-pulse bg-gray-700 "></div>
);

const Stories = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex gap-4 my-[30px] max-[705px]:items-center mx-auto justify-center">
      {isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => <SkeletonLoader key={index} />)
        : users.map((user) => (
            <div
              key={user.id}
              className="border-4 border-[#685DFF] w-[72px] h-[72px] rounded-full overflow-hidden cursor-pointer"
            >
              <img
                src={user.img}
                alt={user.nickname}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

      <button className="text-white bg-[#1D1D22] p-2 rounded-full hover:bg-[#5147d1] transition-all duration-300">
        <MdKeyboardArrowRight size={16} color="#877EFF" />
      </button>
    </div>
  );
};

export default Stories;
