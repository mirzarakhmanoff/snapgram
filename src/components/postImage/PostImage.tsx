import React from "react";
import SkeletonLoader from "../../pages/singlePostPage/SkeletonLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface ContentItem {
  type: "IMAGE" | "VIDEO";
  url: string;
}

interface PostImageProps {
  data: {
    content: ContentItem[];
  };
  isLoading: boolean;
  id: any;
}

const PostImage: React.FC<PostImageProps> = ({ data, isLoading, id }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} border border-white-500 bg-white-500 text-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };

  return (
    <div>
      <div className="flex-1 mt-[50px]">
        {isLoading ? (
          <SkeletonLoader width="600px" height="450px" borderRadius="15px" />
        ) : (
          <div className="image-container max-w-[600px] h-[500px] mt-[50px]  w-full flex items-center justify-center mx-auto">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={pagination}
              navigation={{
                prevEl: `.swiper-button-prev-${id}`,
                nextEl: `.swiper-button-next-${id}`,
              }}
              spaceBetween={50}
              slidesPerView={1}
            >
              {data?.content?.map((content, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full mb-2 h-96">
                    {content.type === "IMAGE" ? (
                      <img
                        src={content.url}
                        alt={`Post content ${index + 1}`}
                        className="w-full h-full rounded-lg cursor-pointer object-contain"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-full rounded-lg"
                        src={content.url}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
              <div
                className={`swiper-button-prev swiper-button-prev-${id} text-white`}
              />
              <div
                className={`swiper-button-next swiper-button-next-${id} text-white`}
              />
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostImage;
