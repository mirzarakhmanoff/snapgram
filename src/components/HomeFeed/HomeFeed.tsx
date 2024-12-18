import { GiHamburgerMenu } from "react-icons/gi";
import Post from "../post/Post";
import { useEffect, useState, useRef } from "react";
import { useGetPostsQuery } from "../../redux/api/file-api";
import { ClipLoader } from "react-spinners";

const HomeFeed = () => {
  const [limit, setLimit] = useState(10);
  const { data, error, isLoading, refetch, isFetching } = useGetPostsQuery({
    limit,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && data?.total > limit) {
          setLimit((prev) => prev + 10);
        }
      },
      {
        threshold: 0.3,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isFetching, limit, data]);

  useEffect(() => {
    if (limit > 10 || !isFetching) {
      refetch();
    }
  }, [limit, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color={"#fff"} loading={true} size={50} />
      </div>
    );
  }
  if (error)
    return <p className="text-red-500 text-center">Error loading posts.</p>;

  return (
    <div className="container mx-auto p-4 ">
      <div className=" p-4 rounded-lg shadow-md mb-4">
        <div className="text-white flex items-center justify-between">
          <h2 className="text-3xl font-bold">Home Feed</h2>
          <div className="flex items-center text-gray-300 hover:text-white transition">
            <span className="mr-2">All</span>
            <GiHamburgerMenu className="text-2xl" />
          </div>
        </div>
      </div>

      {data?.posts?.length === 0 ? (
        <p className="text-5xl text-center mt-10 text-white font-bold">
          <span className="block mb-4">No publications yet</span>
          <span className="text-lg text-gray-300">
            Follow someone to see their posts!
          </span>
        </p>
      ) : (
        <Post data={data} loading={isLoading} refetch={refetch} />
      )}

      <div ref={loaderRef} className="w-full h-[50px] bg-black" />

      {isFetching && (
        <div className="flex justify-center my-4 mx-auto h-14 w-[400px]">
          <ClipLoader color={"#fff"} loading={true} size={50} />
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
