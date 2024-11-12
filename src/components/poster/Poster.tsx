import { FC } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegComment } from "react-icons/fa";
import SkeletonLoader from "../../pages/singlePostPage/SkeletonLoader";
import { PosterProps, PostType } from "../../types";

const Poster: FC<PosterProps> = ({ data, offSet, isLoading }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-1">
        {isLoading
          ? Array.from({ length: offSet }).map((_, index) => (
              <SkeletonLoader key={index} height="300px" borderRadius="8px" />
            ))
          : data?.slice(0, offSet).map((post: PostType) => (
              <Link
                to={`/post/${post.owner.username}/${post._id}`}
                key={post._id}
              >
                <div className="relative group overflow-hidden rounded-lg bg-gray-900 shadow-md h-[320px] transition-all duration-300 hover:shadow-lg hover:scale-105">
                  {post?.content[0]?.type === "IMAGE" ? (
                    <img
                      src={post.content[0].url}
                      alt={`Post content`}
                      className="w-full h-full rounded-lg cursor-pointer object-cover"
                    />
                  ) : (
                    <video
                      controls
                      className="w-full h-full rounded-lg object-cover"
                      src={post?.content[0]?.url}
                    />
                  )}

                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <FaHeart className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform" />
                      <FaRegComment className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {post.likes && (
                    <div className="absolute bottom-4 left-4 right-4 bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg flex justify-between items-center text-white text-sm shadow-lg">
                      <span className="flex items-center">
                        <FaHeart className="mr-1 text-pink-500" />{" "}
                        {post.likes.length}
                      </span>
                      <span className="flex items-center">
                        <FaRegComment className="mr-1 text-blue-500" />{" "}
                        {post.comments.length}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Poster;
