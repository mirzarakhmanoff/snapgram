import { useState } from "react";
import { useGetPostsQuery } from "../../redux/api/file-api";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface PostType {
  _id: string;
  caption: string;
  content_alt: string;
  createdAt: string;
  content: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
}

function Post() {
  const { data, error, isLoading } = useGetPostsQuery({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading posts.</p>;

  return (
    <div className="post-list bg-gray-900 p-4">
      {data?.posts?.map((post: PostType) => (
        <div
          key={post._id}
          className="twitter-post bg-gray-800 shadow-md rounded-lg p-4 mb-6"
        >
          <div className="post-header flex items-center mb-2">
            <img
              src="https://example.com/default-avatar.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <span className="user-name font-semibold text-white">
                {post.caption}
              </span>
              <span className="date text-gray-400 text-sm block">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="post-content mb-4">
            <p className="text-gray-300">{post.content_alt}</p>

            {post.content.length > 0 && (
              <div className="image-container my-4  max-w-[600px] w-full">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {post.content.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <div key={index} className="relative w-full h-64 mb-2">
                        <img
                          src={imageUrl}
                          alt={`Post content ${index + 1}`}
                          className="w-full h-full rounded-lg cursor-pointer object-cover"
                          onClick={() => handleImageClick(imageUrl)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          <div className="post-actions flex justify-between text-gray-400 mb-4">
            <div className="flex items-center">
              <i className="fa fa-heart mr-1"></i>
              <span>{post.likes_count}</span>
            </div>
            <div className="flex items-center">
              <i className="fa fa-comment mr-1"></i>
              <span>{post.comments_count}</span>
            </div>
            <div className="flex items-center">
              <i className="fa fa-share mr-1"></i>
              <span>{post.shares_count}</span>
            </div>
          </div>

          <div className="comment-section">
            <textarea
              placeholder="Write your comment..."
              className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg p-2 mb-2"
            />
            <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
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
