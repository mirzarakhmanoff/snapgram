import { useGetAllPostsQuery } from "../../redux/api/post-api";
import { useState } from "react";
import SkeletonLoader from "../singlePostPage/SkeletonLoader";
import Search from "../../components/search/Search";
import Poster from "../../components/poster/Poster";

const hashtags = [
  "mountains",
  "webdevelopment",
  "funny",
  "modeling",
  "funny",
  "modeling",
];

const Explore = () => {
  const { data, isLoading } = useGetAllPostsQuery({ limit: 20 });
  const [offSet, setOffSet] = useState(20);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 mx-auto md:ml-[300px] ">
      <div className="max-w-6xl mx-auto">
        <h1 className="md:text-4xl font-bold md:mb-8 mb-2 text-center ">
          Search Hashtags
        </h1>

        <div className="mb-3 w-full h-full">
          <Search />
        </div>

        <div className="flex  gap-3 mb-10  w-full  h-[30px] overflow-scroll  ">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-6">Popular Today</h2>

        <Poster data={data} offSet={offSet} isLoading={isLoading} />
      </div>

      <div className="w-full flex items-center justify-center my-5">
        {isLoading ? (
          <SkeletonLoader width="200px" height="50px" borderRadius="25px" />
        ) : (
          <button
            onClick={() => setOffSet((p) => p + 8)}
            className="mx-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          >
            See more
          </button>
        )}
      </div>
    </div>
  );
};

export default Explore;
