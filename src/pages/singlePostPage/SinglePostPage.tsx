import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetPostCommentsQuery,
  useGetSinglePostQuery,
} from "../../redux/api/post-api";
import { FaHeart, FaChevronCircleLeft } from "react-icons/fa";
import profileimg from "../../assets/avatarka.jpg";
import CommentInput from "../../components/commentInput/CommentInput";
import SkeletonLoader from "./SkeletonLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PostActions from "../../components/postActions/PostActions";

const SinglePostPage = () => {
  const { username, id } = useParams<{ username: string; id: string }>();
  const {
    data,
    isLoading,
    isError,
    refetch: fetching,
  } = useGetSinglePostQuery({ username, id });
  const { data: comments, refetch } = useGetPostCommentsQuery({ id });
  const navigate = useNavigate();

  if (isError) return <div>Error loading post.</div>;

  const pagination = {
    clickable: true,
    renderBullet: function (_: any, className: string) {
      return `<span class="${className} border border-white-500 bg-white-500 text-white w-2 h-2 p-1 rounded-full inline-block"></span>`;
    },
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen bg-black ml-[300px] ">
      <div className="flex bg-[#1d1d1d] text-white  p-6 w-[1200px] flex-wrap gap-5">
        <div onClick={handleGoBack} className="cursor-pointer block h-max  ">
          <FaChevronCircleLeft className="text-5xl" />
        </div>
        <div className="flex-1 mt-[50px] ">
          {isLoading ? (
            <SkeletonLoader width="600px" height="450px" borderRadius="15px" />
          ) : (
            <div className="image-container  max-w-[600px] h-[500px] mt-[50px] rounded-md  w-full flex items-center justify-center mx-auto  border-hidden ">
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
                {data?.content?.map((content: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full  mb-2 h-96">
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
                        ></video>
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

        <div className="flex-1 ml-6">
          <Link to={`/profile/${username}`}>
            <div className="flex items-center mb-4">
              {isLoading ? (
                <SkeletonLoader width="96px" height="96px" borderRadius="50%" />
              ) : (
                <img
                  src={
                    data?.owner?.photo?.includes("https")
                      ? data?.owner?.photo
                      : profileimg
                  }
                  alt={
                    data?.owner?.photo
                      ? "Profile photo"
                      : "Default profile photo"
                  }
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              )}

              <div className="ml-4">
                <h2 className="font-bold">
                  {isLoading ? (
                    <SkeletonLoader width="150px" />
                  ) : (
                    data?.owner.fullName
                  )}
                </h2>
                <p className="text-gray-400">
                  {isLoading ? (
                    <SkeletonLoader width="100px" />
                  ) : (
                    `@${data?.owner.username}`
                  )}
                </p>
                <span className="text-sm text-gray-500">
                  {isLoading ? (
                    <SkeletonLoader width="80px" />
                  ) : (
                    data?.createdAt
                  )}
                </span>
              </div>
            </div>
          </Link>

          <p className="text-lg">
            {isLoading ? (
              <SkeletonLoader width="100%" height="60px" />
            ) : (
              data?.caption
            )}
          </p>

          <hr className="my-4 border-gray-600" />

          <div className="h-[350px] overflow-scroll">
            {isLoading ? (
              <SkeletonLoader width="100%" height="300px" />
            ) : comments?.length === 0 ? (
              <div className="mx-auto flex flex-col items-center justify-center p-4">
                <p className="block text-lg font-bold text-center text-white">
                  Send Your Comment
                </p>
                <p className="block text-sm text-center text-gray-400">
                  Be first
                </p>
              </div>
            ) : (
              comments?.map((comment: any, idx: number) => (
                <div key={idx} className="flex mb-4">
                  <div className="ml-4">
                    <h3 className="font-semibold">{comment?.user?.fullName}</h3>
                    <p>{comment?.message}</p>
                    <span className="text-gray-500 text-sm">
                      {comment?.createdAt}
                    </span>
                  </div>
                  <div className="ml-auto text-gray-500 flex items-center space-x-2">
                    <FaHeart />
                    <span>{comment?.likes}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <PostActions refetch={fetching} post={data} />

          <CommentInput id={String(data?._id)} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
