import { useParams } from "react-router-dom";
import {
  useGetPostCommentsQuery,
  useGetSinglePostQuery,
} from "../../redux/api/post-api";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import profileimg from "../../assets/avatarka.jpg";
import CommentInput from "../../components/commentInput/CommentInput";

interface Comment {
  user: {
    fullName: string;
  };
  message: string;
  createdAt: string;
  likes: number;
}

const SinglePostPage = () => {
  const { username, id } = useParams<{ username: string; id: string }>();
  const { data, isLoading, isError } = useGetSinglePostQuery({ username, id });
  const { data: comments, refetch } = useGetPostCommentsQuery({ id });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading post.</div>;

  return (
    <div className="flex min-h-screen bg-black ml-[300px]">
      <div className="flex bg-[#1d1d1d] text-white rounded-2xl p-6 w-[1200px]">
        <div className="flex-1">
          <img
            src={data?.content[0]?.url}
            alt=""
            className="w-[600px] h-[700px] object-contain rounded-xl"
          />
        </div>

        <div className="flex-1 ml-6">
          <div className="flex items-center mb-4">
            <img
              src={
                data?.owner?.photo?.includes("https")
                  ? data?.owner?.photo
                  : profileimg
              }
              alt={
                data?.owner?.photo ? "Profile photo" : "Default profile photo"
              }
              className="w-24 h-24 rounded-full object-cover mb-2"
            />

            <div className="ml-4">
              <h2 className="font-bold">{data?.owner.fullName}</h2>
              <p className="text-gray-400">{`@${data?.owner.username}`}</p>
              <span className="text-sm text-gray-500">{data?.createdAt}</span>
            </div>
          </div>

          <p className="text-lg">{data?.caption}</p>

          <hr className="my-4 border-gray-600" />

          <div className="h-[350px] overflow-scroll">
            {comments?.length === 0 ? (
              <div className="mx-auto flex flex-col items-center justify-center  p-4">
                <p className="block text-lg font-bold text-center text-white">
                  Send Your Comment
                </p>
                <p className="block text-sm text-center text-gray-400">
                  Be first
                </p>
              </div>
            ) : (
              comments.map((comment: Comment, idx: number) => (
                <div key={idx} className="flex mb-4">
                  {data.content.type === "IMAGE" && (
                    <img
                      src={data.content[0].url}
                      alt={`Post ${idx} content ${data.contentIdx}`}
                      className="cursor-pointer object-cover w-full h-64 rounded-lg border"
                    />
                  )}
                  {data?.content?.type === "VIDEO" && (
                    <video
                      src={data.content[0].url}
                      controls
                      muted
                      className="w-full h-auto cursor-pointer border"
                    ></video>
                  )}

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

          <div className="flex items-center mt-6 space-x-6">
            <div className="flex items-center space-x-2">
              <FaHeart />
              <span>{data?.likes?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaComment />
              <span>{data?.comments?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaShare />
              <span>{data?.shares}</span>
            </div>
          </div>

          <CommentInput id={String(data?._id)} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
