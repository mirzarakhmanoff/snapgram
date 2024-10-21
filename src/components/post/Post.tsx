import { Swiper, SwiperSlide } from "swiper/react";
import { FaComment, FaShare, FaRegHeart } from "react-icons/fa";

import "swiper/css";
import avatar from "../../assets/avatarka.jpg";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PostType {
  _id: string;
  caption: string;
  content_alt: string;
  createdAt: string;
  content: [
    {
      url: string;
      type: "AUDIO" | "VIDEO" | "IMAGE";
    }
  ];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  owner: any;
  photo: string;
}

function Post({ data }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [postId: string]: string }>({});

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} border border-white-500 bg-white-500 text-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };

  const handleCommentChange = (postId: string, value: string) => {
    setComments((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  // if (isLoading) return <p className="text-white">Loading...</p>;
  // if (error) return <p className="text-red-500">Error loading posts.</p>;

  return (
    <div className="post-list bg-gray-900 p-4">
      {data?.posts?.map((post: PostType) => (
        <div
          key={post._id}
          className="twitter-post bg-gray-800 shadow-md rounded-lg p-4 mb-6"
        >
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

            <Link to={`/profile/${post?.owner?.username}`}>
              <div>
                <span className="user-name font-semibold text-white">
                  {post.caption}
                </span>
                <span className="date text-gray-400 text-sm block">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            </Link>
          </div>

          <div className="post-content mb-4">
            <p className="text-gray-300">{post.content_alt}</p>

            {post.content.length > 0 && (
              <div className="image-container my-4 max-w-[600px] w-full  mx-auto">
                <Swiper
                  modules={[Pagination]}
                  pagination={pagination}
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                >
                  {post.content?.map((content, index) => (
                    <SwiperSlide key={index}>
                      <div key={index} className="relative w-full h-64 mb-2">
                        <img
                          src={content.url}
                          alt={`Post content ${index + 1}`}
                          className="w-full h-full rounded-lg cursor-pointer object-cover"
                          onClick={() => handleImageClick(content.url)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          <div className="post-actions flex justify-start gap-3 text-gray-400 mb-4">
            <div className="flex items-center">
              <FaRegHeart className="mr-1 " />
              <span>{post.likes_count}</span>
            </div>
            <div className="flex items-center">
              <FaComment className="mr-1" />
              <span>{post.comments_count}</span>
            </div>
            <div className="flex items-center">
              <FaShare className="mr-1" />
              <span>{post.shares_count}</span>
            </div>
          </div>

          <div className="comment-section">
            <textarea
              placeholder="Write your comment..."
              className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg p-2 mb-2"
              value={comments[post._id] || ""}
              onChange={(e) => handleCommentChange(post._id, e.target.value)}
            />
            <button
              className={`bg-blue-600 text-white rounded-lg px-4 py-2 ${
                comments[post._id] ? "opacity-100" : "opacity-50"
              }`}
              disabled={!comments[post._id]}
            >
              Send
            </button>
          </div>
        </div>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-full max-h-full flex items-center justify-center">
            <div className="relative">
              <div className="zoomed-image-container">
                <img
                  src={selectedImage}
                  alt="Zoomed"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
