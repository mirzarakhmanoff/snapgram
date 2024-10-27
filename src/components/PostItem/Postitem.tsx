import { FC } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CommentInput from "../commentInput/CommentInput";
import PostActions from "../postActions/PostActions";
import UserProfile from "../userProfile/UserProfile";

interface PostItemProps {
  post: any;
  setGalleryImage: (url: string) => void;
  refetch: () => void;
}

const PostItem: FC<PostItemProps> = ({ post, setGalleryImage, refetch }) => {
  const handleImageClick = (imageUrl: string) => {
    setGalleryImage(imageUrl);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} border border-white-500 bg-white-500 text-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };

  return (
    <div
      key={post._id}
      className="twitter-post bg-gray-800 shadow-md rounded-lg p-4 mb-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto"
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
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={pagination}
                navigation={{
                  prevEl: `.swiper-button-prev-${post._id}`,
                  nextEl: `.swiper-button-next-${post._id}`,
                }}
                spaceBetween={20}
                slidesPerView={1}
              >
                {post.content?.map((content: any, index: string) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-48 sm:h-56 lg:h-64 mb-2">
                      {content.type === "IMAGE" ? (
                        <img
                          src={content.url}
                          alt={`Post content ${index + 1}`}
                          className="w-full h-full rounded-lg cursor-pointer object-contain"
                          onClick={() => handleImageClick(content.url)}
                        />
                      ) : (
                        <video
                          controls
                          className="w-full h-full rounded-lg object-cover"
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
      </Link>
      <PostActions refetch={refetch} post={post} />
      <CommentInput id={String(post._id)} />
    </div>
  );
};

export default PostItem;
