import { useGetUserPostsQuery } from "../../redux/api/file-api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { ContentItem, PostImageData, PostsProps } from "../../types";

const Posts = ({ userId, data: user }: PostsProps) => {
  const { data: posts, isLoading } = useGetUserPostsQuery({ userId });

  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} bg-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {posts?.map((post: PostImageData, idx: number) => (
        <Link to={`/post/${user.username}/${post._id}`} key={idx}>
          <div className="w-[300px] h-[300px]">
            <Swiper
              modules={[Pagination]}
              pagination={pagination}
              spaceBetween={50}
              slidesPerView={1}
            >
              {post?.content?.map((media: ContentItem, mediaIdx: number) => (
                <SwiperSlide key={mediaIdx}>
                  <div>
                    {media.type === "IMAGE" && (
                      <img
                        src={media.url}
                        alt={`Post ${idx} content ${mediaIdx}`}
                        className="cursor-pointer object-cover w-full h-64 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
                      />
                    )}
                    {media.type === "VIDEO" && (
                      <video
                        src={media.url}
                        controls
                        className="w-[300px] h-[260px] cursor-pointer border border-gray-300 rounded-lg shadow-md object-cover"
                      ></video>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
