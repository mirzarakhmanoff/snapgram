import {
  FaBookmark,
  FaComment,
  FaHeart,
  FaRegBookmark,
  FaRegHeart,
  FaShare,
} from "react-icons/fa";
import { useToggleLikeMutation } from "../../redux/api/post-api";
import { useDispatch, useSelector } from "react-redux";
import { toggleSave } from "../../redux/slice/saved-slice";
import { FC } from "react";
import { PostActionsProps, PostType } from "../../types";

const PostActions: FC<PostActionsProps> = ({ refetch, post }) => {
  const [like] = useToggleLikeMutation({});
  const dispatch = useDispatch();
  const saved = useSelector(
    (state: { saved: { value: PostType[] } }) => state.saved
  );

  const user = JSON.parse(localStorage.getItem("user")!);
  const isLiked = post?.likes?.includes(user._id);

  const toggleLike = (id: string) => {
    like(id);
    setTimeout(() => {
      refetch?.();
    }, 100);
  };

  return (
    <div>
      <div className="post-actions flex gap-3 justify-between text-gray-400 mb-4 text-xs sm:text-sm mt-[20px]">
        <div className="flex gap-3">
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
        <div className="flex items-center">
          <button onClick={() => dispatch(toggleSave(post))}>
            {saved?.value?.find((item) => item?._id === post?._id) ? (
              <FaBookmark className="mr-1 text-xl" />
            ) : (
              <FaRegBookmark className="mr-1 text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
