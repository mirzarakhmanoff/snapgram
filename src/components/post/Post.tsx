import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import PostSkeleton from "./PostSkeleton";
import PostItem from "../PostItem/Postitem";
import { PostType } from "../../types";

function Post({
  data,
  loading,
  refetch,
}: {
  data: any;
  loading: boolean;
  refetch: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="post-list bg-gray-900 p-4">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="post-list bg-gray-900 p-4">
      {data?.posts?.map((post: PostType, i: number) => (
        <PostItem
          post={post}
          key={i}
          setGalleryImage={setSelectedImage}
          refetch={refetch}
        />
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-full max-h-full flex items-center justify-center">
            <div className="relative">
              <div className="zoomed-image-container">
                <img
                  src={selectedImage}
                  alt="Увеличенное"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
