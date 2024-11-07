import { useEffect, useState } from "react";
import Poster from "../../components/poster/Poster";
import { useAppSelector } from "../../redux";

const Saved = () => {
  const [offSet] = useState(20);
  const saved = useAppSelector((state) => state.saved);
  useEffect(() => {
    console.log(saved);
  }, [saved]);
  return (
    <div className="flex flex-wrap mt-[50px] ml-[100px] items-start justify-start gap-5">
      <div>
        <Poster data={saved.value} offSet={offSet} />
      </div>
    </div>
  );
};

export default Saved;
