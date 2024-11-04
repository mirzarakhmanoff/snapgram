import { FaHeart } from "react-icons/fa";
import SkeletonLoader from "../../pages/singlePostPage/SkeletonLoader";
import React from "react";
import { CommentsProps } from "../../types";

const Comments: React.FC<CommentsProps> = ({ comments, isLoading }) => {
  return (
    <div>
      <div className="h-[350px] overflow-scroll">
        {isLoading ? (
          <SkeletonLoader width="100%" height="300px" />
        ) : comments?.length === 0 ? (
          <div className="mx-auto flex flex-col items-center justify-center p-4">
            <p className="block text-lg font-bold text-center text-white">
              Send Your Comment
            </p>
            <p className="block text-sm text-center text-gray-400">Be first</p>
          </div>
        ) : (
          comments?.map((comment, idx) => (
            <div key={idx} className="flex mb-4">
              <div className="ml-4">
                <h3 className="font-semibold">{comment?.user?.fullName}</h3>
                <p>{comment.message}</p>
                <span className="text-gray-500 text-sm">
                  {comment.createdAt}
                </span>
              </div>
              <div className="ml-auto text-gray-500 flex items-center space-x-2">
                <FaHeart />
                <span>{comment.likes}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
