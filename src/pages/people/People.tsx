import Creators from "../../components/creators/Creators";
import { useGetUserQuery } from "../../redux/api/register-api";

const People = () => {
  const { data: creators, isLoading, error } = useGetUserQuery({ limit: 100 });

  return (
    <div className="p-6 ml-[300px]  ">
      <div className="flex items-center justify-center  gap-20  ">
        <Creators
          creators={creators}
          error={error}
          isLoading={isLoading}
          title={"Peoples"}
        />
      </div>
    </div>
  );
};

export default People;
