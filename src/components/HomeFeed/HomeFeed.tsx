import { GiHamburgerMenu } from "react-icons/gi";
import Post from "../post/Post";
import { useEffect, useRef, useState } from "react";
import { useGetPostsQuery } from "../../redux/api/file-api";
import { ClipLoader } from "react-spinners";

const HomeFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [limit, setLimit] = useState(10);
  const { data, error, isLoading, refetch } = useGetPostsQuery({ limit });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setLimit((prev) => prev + 10);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      refetch();
    }
  }, [limit, isVisible, refetch]);

  if (isLoading) return <p className="text-white">Loading...</p>;
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
        ref={ref}
        style={{
          height: "100px",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isVisible && <ClipLoader color={"#fff"} loading={true} size={50} />}
      </div>
    </div>
  );
};

export default HomeFeed;
