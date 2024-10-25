import { useState } from "react";
import { usePostCommentMutation } from "../../redux/api/post-api";
import profileimg from "../../assets/avatarka.jpg";

interface CommentInputProps {
  id: string;
  refetch?: () => void;
}

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
      <div className="comment-section flex items-center justify-center gap-4 mt-3 ">
        <img
          src={user?.photo?.includes("https") ? user?.photo : profileimg}
          alt={user?.photo ? "Profile photo" : "Default profile photo"}
          className="w-12 h-12 rounded-full object-cover mb-2"
        />

        <input
          type="text"
          placeholder="Напишите ваш комментарий..."
          className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-lg p-2 "
          value={message}
          onChange={(e) => handleCommentChange(e.target.value)}
          name="message"
        />
        <button
          className={`bg-blue-600 text-white rounded-lg px-4 py-2 ${
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
