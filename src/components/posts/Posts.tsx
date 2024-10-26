import { useGetUserPostsQuery } from "../../redux/api/file-api";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Posts = ({ userId, data: user }: any) => {
  const { data: posts, isLoading } = useGetUserPostsQuery({ userId });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} bg-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-5 animate-pulse">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="w-[300px] h-64 bg-gray-700 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5">
      {posts?.map((post: any, idx: number) => (
        <Link to={`/post/${user.username}/${post._id}`}>
          <div key={idx} className="w-[300px]">
            <Swiper
              modules={[Pagination]}
              pagination={pagination}
              spaceBetween={50}
              slidesPerView={1}
            >
              {post?.content?.map((media: any, mediaIdx: number) => (
                <SwiperSlide key={mediaIdx}>
                  <div>
                    {media.type === "IMAGE" && (
                      <img
                        src={media.url}
                        alt={`Post ${idx} content ${mediaIdx}`}
                        className="cursor-pointer object-cover w-full h-64 rounded-lg border"
                        onClick={() => handleImageClick(media.url)}
                      />
                    )}
                    {media.type === "VIDEO" && (
                      <video
                        src={media.url}
                        controls
                        className="w-full h-auto cursor-pointer border"
                      ></video>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Link>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="Zoomed"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-gray-900 rounded-full px-3 py-1"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
