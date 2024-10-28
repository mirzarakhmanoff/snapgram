import { FaSearch, FaHeart, FaRegComment } from "react-icons/fa";
import { useGetAllPostsQuery } from "../../redux/api/post-api";
import { Link } from "react-router-dom";
import { useState } from "react";
import SkeletonLoader from "../singlePostPage/SkeletonLoader";

const hashtags = ["mountains", "webdevelopment", "funny", "modeling"];

const Explore = () => {
  const { data, isLoading } = useGetAllPostsQuery({ limit: 20 });
  const [offSet, setOffSet] = useState(20);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8 mx-auto ml-[100px]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Search Hashtags</h1>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Creators"
            className="w-full p-4 pl-10 rounded-full bg-gray-800 text-gray-300 placeholder-gray-500"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-500" />
        </div>

        <div className="flex flex-wrap gap-3 mb-10 justify-center">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: offSet }).map((_, index) => (
                <SkeletonLoader key={index} height="300px" borderRadius="8px" />
              ))
            : data?.slice(0, offSet).map((post: any) => (
                <Link
                  to={`/post/${post.owner.username}/${post._id}`}
                  key={post.id}
                >
                  <div className="relative group overflow-hidden rounded-lg bg-gray-800 shadow-lg h-[300px]">
                    {post?.content[0]?.type === "IMAGE" ? (
                      <img
                        src={post?.content[0]?.url}
                        alt={`Post content 1`}
                        className="w-full h-full rounded-lg cursor-pointer object-contain"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-full rounded-lg object-cover"
                        src={post?.content[0]?.url}
                      />
                    )}

                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <FaHeart className="text-white text-xl cursor-pointer" />
                      <FaRegComment className="text-white text-xl cursor-pointer" />
                    </div>

                    {post.likes && (
                      <div className="absolute bottom-4 left-4 flex items-center text-white space-x-3">
                        <span className="flex items-center text-sm">
                          <FaHeart className="mr-1" /> {post.likes.length}
                        </span>
                        <span className="flex items-center text-sm">
                          <FaRegComment className="mr-1" />{" "}
                          {post.comments_count}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
        </div>
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
