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
        if (entry.isIntersecting && !isFetching && data.total > limit) {
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
  }, [isFetching]);

  useEffect(() => {
    if (limit > 10 || !isFetching) {
      refetch();
    }
  }, [limit, refetch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center mx-auto my-auto mt-[200px]"></div>
    );
  if (error) return <p className="text-red-500">Error loading posts.</p>;

  return (
    <div>
      <div className="text-white flex items-center justify-between">
        <h2 className="text-[30px]">Home Feed</h2>
        <div className="flex items-center">
          <span>All</span>
          <GiHamburgerMenu />
        </div>
      </div>

      <Post data={data} />

      <div
        ref={loaderRef}
        className="w-full h-[50px]"
        style={{
          background: "black",
        }}
      />

      {isFetching && (
        <div className="flex justify-center my-4 mx-auto h-14 w-[400px]">
          <ClipLoader color={"#fff"} loading={true} size={50} />
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
