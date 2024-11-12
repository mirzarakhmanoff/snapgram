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
    <div className="flex min-h-screen bg-black md:ml-[300px] p-4 md:p-8">
      <div className="flex flex-col bg-[#1d1d1d] text-white w-full md:w-[1200px] gap-5 p-4 md:p-8 shadow-lg">
        <div onClick={handleGoBack} className="cursor-pointer h-max mb-4">
          <FaChevronCircleLeft className="text-3xl md:text-5xl hover:text-gray-400 transition" />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-6">
          <div className="flex flex-col w-full md:w-[60%]">
            <PostImage data={data} isLoading={isLoading} id={id} />
            <PostActions refetch={fetching} post={data} />
            <CommentInput id={String(data?._id)} refetch={refetch} />
          </div>

          <div className="flex flex-col w-full md:w-[40%] mt-6 md:mt-0">
            <div className="mb-4">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="md:flex hidden flex-col items-start border border-gray-500 rounded-lg p-4">
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
                  <p className="text-lg text-gray-200 mt-2">{data?.caption}</p>
                </div>
              )}
            </div>

            <div className="border border-gray-500 rounded-lg p-4">
              <Comments comments={comments} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex items-center mb-4 w-full">
    <SkeletonLoader width="64px" height="64px" borderRadius="50%" />
    <div className="ml-4 w-full">
      <SkeletonLoader width="70%" height="20px" />
      <SkeletonLoader width="50%" height="16px" />
      <SkeletonLoader width="40%" height="14px" />
    </div>
  </div>
);

export default SinglePostPage;
