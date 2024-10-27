import { FaComment, FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { useToggleLikeMutation } from "../../redux/api/post-api";

const PostActions = ({ refetch, post }: any) => {
  const [like] = useToggleLikeMutation({});
  const toggleLike = (id: any) => {
    like(id);
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const user = JSON.parse(localStorage.getItem("user")!);
  const isLiked = post?.likes?.includes(user._id);

  return (
    <div>
      <div className="post-actions flex gap-3 text-gray-400 mb-4 text-xs sm:text-sm">
        <div className="flex items-center">
          <button onClick={() => toggleLike(post._id)}>
            {!isLiked ? (
              <FaRegHeart className="mr-1 " />
            ) : (
              <FaHeart className="mr-1 text-red-700 text-xl" />
            )}
          </button>
          <span>{post?.likes?.length}</span>
        </div>
        <div className="flex items-center">
          <button>
            <FaComment className="mr-1 text-xl" />
          </button>
          <span>{post?.comments?.length}</span>
        </div>
        <div className="flex items-center">
          <button>
            <FaShare className="mr-1 text-xl" />
          </button>
          <span>{post?.shares_count}</span>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
