import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Post() {
  const post = {
    user: {
      avatar: "https://example.com/avatar.jpg",
      name: "Lewis Hamilton",
    },
    date: "26 June at 09:32 PM",
    text: "It's a big world out there - explore! #nature #mountains",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    likes: 120,
    comments: 68,
    shares: 74,
  };

  return (
    <div className="twitter-post bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="post-header flex items-center mb-2">
        <img
          src={post.user.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <span className="user-name font-semibold text-gray-800">
            {post.user.name}
          </span>
          <span className="date text-gray-500 text-sm block">{post.date}</span>
        </div>
      </div>
      <div className="post-content mb-4">
        <p className="text-gray-700">{post.text}</p>
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          pagination={{ clickable: true }}
          className="my-4"
        >
          {post.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="post-actions flex justify-between text-gray-600 mb-4">
        <div className="flex items-center">
          <i className="fa fa-heart mr-1"></i>
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center">
          <i className="fa fa-comment mr-1"></i>
          <span>{post.comments}</span>
        </div>
        <div className="flex items-center">
          <i className="fa fa-share mr-1"></i>
          <span>{post.shares}</span>
        </div>
      </div>
      <div className="comment-section">
        <textarea
          placeholder="Write your comment..."
          className="w-full border rounded-lg p-2 mb-2"
        />
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
          Send
        </button>
      </div>
    </div>
  );
}

export default Post;
