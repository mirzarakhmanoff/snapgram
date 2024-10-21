import { useGetUserPostsQuery } from "../../redux/api/file-api";
import { useState } from "react";

const Posts = ({ userId }: any) => {
  const { data: posts } = useGetUserPostsQuery({ userId });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {posts?.map((post: any, idx: number) => (
        <div key={idx} className="w-[300px]">
          <img
            src={post?.content[0]?.url}
            alt=""
            className="cursor-pointer"
            onClick={() =>
              handleImageClick(post.content.map((idx: number) => idx).url)
            }
          />
        </div>
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
