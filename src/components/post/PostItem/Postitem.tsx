import { FC, useState } from "react";
import { FaComment, FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import avatar from "../../../assets/avatarka.jpg";
import {
  usePostCommentMutation,
  useToggleLikeMutation,
} from "../../../redux/api/post-api";

interface PostItemProps {
  post: any;
  setGalleryImage: (url: string) => void;
  refetch: () => void;
}

const PostItem: FC<PostItemProps> = ({ post, setGalleryImage, refetch }) => {
  const [message, setComments] = useState<string>("");

  const handleImageClick = (imageUrl: string) => {
    setGalleryImage(imageUrl);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} border border-white-500 bg-white-500 text-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };

  const handleCommentChange = (value: string) => {
    setComments(value);
  };
  const [like] = useToggleLikeMutation({});

  const toggleLike = (id: string) => {
    like(id);
    setTimeout(() => {
      refetch();
    }, 100);
  };

  const [postComment] = usePostCommentMutation();

  const postComments = (id: string) => {
    console.log(id);
    postComment({ id, body: { message } });
  };

  const user = JSON.parse(localStorage.getItem("user")!);
  const isLiked = post.likes.includes(user._id);

  return (
    <div
      key={post._id}
      className="twitter-post bg-gray-800 shadow-md rounded-lg p-4 mb-6"
    >
      <Link to={`/profile/${post?.owner?.username}`}>
        <div className="post-header flex items-center mb-2">
          <img
            src={
              post.owner?.photo && post.owner.photo.includes("https")
                ? post.owner.photo
                : avatar
            }
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <span className="user-name font-semibold text-white">
              {post?.owner.username}
            </span>
            <span className="date text-gray-400 text-sm block">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="post-content mb-4">
        <p className="text-gray-300">{post.content_alt}</p>

        {post.content.length > 0 && (
          <div className="image-container my-4 max-w-[600px] w-full mx-auto">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={pagination}
              navigation={{
                prevEl: `.swiper-button-prev-${post._id}`,
                nextEl: `.swiper-button-next-${post._id}`,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {post.content?.map((content: any, index: string) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-64 mb-2">
                    {content.type === "IMAGE" ? (
                      <img
                        src={content.url}
                        alt={`Post content ${index + 1}`}
                        className="w-full h-full rounded-lg cursor-pointer object-cover"
                        onClick={() => handleImageClick(content.url)}
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-full rounded-lg"
                        src={content.url}
                      ></video>
                    )}
                  </div>
                </SwiperSlide>
              ))}

              <div
                className={`swiper-button-prev swiper-button-prev-${post._id} text-white`}
              />
              <div
                className={`swiper-button-next swiper-button-next-${post._id} text-white`}
              />
            </Swiper>
          </div>
        )}
      </div>

      <div className="post-actions flex justify-start gap-3 text-gray-400 mb-4">
        <div className="flex items-center">
          <button onClick={() => toggleLike(post._id)}>
            {!isLiked ? (
              <FaRegHeart className="mr-1 " />
            ) : (
              <FaHeart className="mr-1 " />
            )}
          </button>
          <span>{post.likes_count}</span>
        </div>
        <div className="flex items-center">
          <button>
            {" "}
            <FaComment className="mr-1" />
          </button>
          <span>{post.comments_count}</span>
        </div>
        <div className="flex items-center">
          <button>
            {" "}
            <FaShare className="mr-1" />
          </button>
          <span>{post.shares_count}</span>
        </div>
      </div>

      <div className="comment-section">
        <input
          type="text"
          placeholder="Напишите ваш комментарий..."
          className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg p-2 mb-2"
          value={message || ""}
          onChange={(e) => handleCommentChange(e.target.value)}
          name="message"
        />
        <button
          className={`bg-blue-600 text-white rounded-lg px-4 py-2 ${
            message ? "opacity-100" : "opacity-50"
          }`}
          disabled={!message}
          onClick={() => postComments(post._id)}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default PostItem;
