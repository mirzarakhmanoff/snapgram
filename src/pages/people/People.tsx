import { useEffect, useRef, useState } from "react";
import Creators from "../../components/creators/Creators";
import { useGetUserQuery } from "../../redux/api/register-api";
import { ClipLoader } from "react-spinners";

const People = () => {
  const [limit, setLimit] = useState(15);
  const {
    data: creators,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useGetUserQuery({ limit });
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setLimit((prev) => prev + 5);
        }
      },
      { threshold: 0.3 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isFetching, limit, creators]);

  useEffect(() => {
    if (limit > 10 || !isFetching) {
      refetch();
    }
  }, [limit, refetch]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <ClipLoader color={"#fff"} size={50} />
  //     </div>
  //   );
  // }

  if (error) {
    return <p className="text-red-500 text-center">Error loading posts.</p>;
  }

  return (
    <div className="p-6 ml-[300px]">
      <div className="flex items-center justify-center gap-20">
        <Creators
          creators={creators}
          isLoading={isLoading}
          title="Peoples"
          error={error}
        />
      </div>
      <div ref={loaderRef} className="w-full h-[50px]" />
      {isFetching && (
        <div className="flex justify-center my-4 mx-auto h-14 w-[400px]">
          <ClipLoader color={"#fff"} size={50} />
        </div>
      )}
    </div>
  );
};

export default People;
