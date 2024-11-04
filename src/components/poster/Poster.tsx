import { Link } from "react-router-dom";
import { FaHeart, FaRegComment } from "react-icons/fa";
import SkeletonLoader from "../../pages/singlePostPage/SkeletonLoader";
import { FC } from "react";
import { PosterProps } from "../../types";

const Poster: FC<PosterProps> = ({ data, offSet, isLoading }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: offSet }).map((_, index) => (
              <SkeletonLoader key={index} height="300px" borderRadius="8px" />
            ))
          : data?.slice(0, offSet).map((post: any) => (
              <Link
                to={`/post/${post.owner.username}/${post._id}`}
                key={post._id}
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
                        <FaRegComment className="mr-1" /> {post.comments_count}
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
