import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostCommentsQuery,
  useGetSinglePostQuery,
} from "../../redux/api/post-api";
import { FaChevronCircleLeft } from "react-icons/fa";
import profileimg from "../../assets/avatarka.jpg";
import CommentInput from "../../components/commentInput/CommentInput";
import SkeletonLoader from "./SkeletonLoader";
import PostActions from "../../components/postActions/PostActions";
import UserProfile from "../../components/userProfile/UserProfile";
import Comments from "../../components/comments/Comments";
import PostImage from "../../components/postImage/PostImage";

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

  if (isError)
    return <div className="text-red-500 text-center">Error loading post.</div>;

  const handleGoBack = () => navigate(-1);

  return (
    <div className="flex min-h-screen bg-black ml-[300px]">
      <div className="flex flex-wrap bg-[#1d1d1d] text-white p-8  w-[1200px] gap-5 shadow-lg ">
        <div onClick={handleGoBack} className="cursor-pointer h-max">
          <FaChevronCircleLeft className="text-5xl hover:text-gray-400 transition" />
        </div>

        <div className="flex-1">
          <div className="flex">
            <div>
              <PostImage data={data} isLoading={isLoading} id={id} />
              <PostActions refetch={fetching} post={data} />
              <CommentInput id={String(data?._id)} refetch={refetch} />
            </div>

            <div className="flex flex-col justify-start ml-6 mt-6   p-4">
              <div className="mb-4">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <div className="flex  flex-col items-start justify-start border border-gray-500 rounded-lg p-4">
                    <UserProfile
                      userData={{
                        username: data?.owner?.username || "username",
                        photo: data?.owner?.photo?.includes("https")
                          ? data.owner.photo
                          : profileimg,
                        createdAt: data?.createdAt,
                      }}
                      linkPrefix={`/profile`}
                      showDate
                      showFullName={false}
                    />
                    <p className="text-lg text-gray-200 mt-2">
                      {data?.caption}
                    </p>
                  </div>
                )}
              </div>

              <div className=" border border-gray-500 rounded-lg p-4 ">
                <Comments comments={comments} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex items-center mb-4">
    <SkeletonLoader width="96px" height="96px" borderRadius="50%" />
    <div className="ml-4">
      <SkeletonLoader width="150px" height="20px" />
      <SkeletonLoader width="100px" height="16px" />
      <SkeletonLoader width="80px" height="14px" />
    </div>
  </div>
);

export default SinglePostPage;
