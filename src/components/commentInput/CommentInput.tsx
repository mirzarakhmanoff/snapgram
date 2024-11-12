import { useState } from "react";
import { usePostCommentMutation } from "../../redux/api/post-api";
import profileimg from "../../assets/avatarka.jpg";
import { CommentInputProps } from "../../types";

const CommentInput: React.FC<CommentInputProps> = ({ id, refetch }) => {
  const [postComment, { isLoading }] = usePostCommentMutation();
  const [message, setMessage] = useState<string>("");
  const user = JSON.parse(localStorage.getItem("user")!);

  const handleCommentChange = (value: string) => {
    setMessage(value);
  };

  const postComments = () => {
    postComment({ id, body: { message } }).then(() => {
      if (typeof refetch === "function") {
        refetch();
      } else {
        console.error("refetch is not a function:", refetch);
      }
      setMessage("");
    });
  };

  return (
    <div>
      <div className="comment-section flex items-center justify-center gap-2 md:gap-4 mt-3  ">
        <img
          src={user?.photo?.includes("https") ? user?.photo : profileimg}
          alt={user?.photo ? "Profile photo" : "Default profile photo"}
          className="md:w-12 md:h-12 w-10 h-10  rounded-full object-cover mb-2"
        />

        <input
          type="text"
          placeholder="Напишите ваш комментарий..."
          className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg p-1 md:p-2 "
          value={message}
          onChange={(e) => handleCommentChange(e.target.value)}
          name="message"
        />
        <button
          className={`bg-blue-600 text-white rounded-lg md:px-4 md:py-2 py-1 px-1 ${
            message ? "opacity-100" : "opacity-50"
          }`}
          disabled={!message}
          onClick={postComments}
        >
          {isLoading ? "Loading..." : "Отправить"}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
