import { FC } from "react";
import { Link } from "react-router-dom";
import CommentInput from "../commentInput/CommentInput";
import PostActions from "../postActions/PostActions";
import UserProfile from "../userProfile/UserProfile";
import { PostItemProps } from "../../types";

const PostItem: FC<PostItemProps> = ({ post, setGalleryImage, refetch }) => {
  const handleImageClick = (imageUrl: string) => {
    setGalleryImage?.(imageUrl);
  };

  return (
    <div
      key={post._id}
      className="twitter-post  bg-gray-800 shadow-md rounded-lg p-4 mb-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto"
    >
      <UserProfile
        userData={{
          username: post?.owner?.username,
          photo: post?.owner?.photo,
          createdAt: post?.createdAt,
        }}
        showFullName={false}
        showDate={true}
      />

      <Link to={`/post/${post?.owner?.username}/${post._id}`}>
        <div className="post-content mb-4">
          <p className="text-gray-300 text-sm sm:text-base">
            {post.content_alt}
          </p>

          {post.content.length > 0 && (
            <div className="image-container my-4 max-w-full w-full mx-auto">
              <div className="relative w-full h-48 sm:h-56 lg:h-64 mb-2">
                {post.content[0].type === "IMAGE" ? (
                  <img
                    src={post.content[0].url}
                    alt={`Post content 1`}
                    className="w-full h-full rounded-lg cursor-pointer object-contain"
                    onClick={() => handleImageClick(post.content[0].url)}
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full rounded-lg object-cover"
                    src={post.content[0].url}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Link>

      <PostActions refetch={refetch} post={post} />
      <CommentInput id={String(post._id)} />
    </div>
  );
};

export default PostItem;
