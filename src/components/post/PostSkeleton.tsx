const PostSkeleton = () => {
  return (
    <div className="twitter-post bg-gray-800 shadow-md rounded-lg p-4 mb-6 animate-pulse">
      <div className="post-header flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
        <div className="flex flex-col">
          <div className="bg-gray-700 w-32 h-4 rounded mb-1"></div>
          <div className="bg-gray-600 w-20 h-3 rounded"></div>
        </div>
      </div>
      <div className="post-content mb-4">
        <div className="bg-gray-700 w-full h-4 rounded mb-2"></div>
        <div className="image-container my-4 max-w-[600px] w-full mx-auto">
          <div className="w-full h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="post-actions flex justify-start gap-3 text-gray-400 mb-4">
        <div className="flex items-center">
          <div className="bg-gray-700 w-8 h-4 rounded mr-1"></div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-700 w-8 h-4 rounded mr-1"></div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-700 w-8 h-4 rounded mr-1"></div>
        </div>
      </div>
      <div className="comment-section">
        <div className="bg-gray-700 w-full h-8 rounded mb-2"></div>
        <div className="bg-blue-600 w-20 h-8 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
