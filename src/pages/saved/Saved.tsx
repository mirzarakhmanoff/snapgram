import { useState } from "react";
import Poster from "../../components/poster/Poster";

const Saved = () => {
  const savedPosts = JSON.parse(localStorage.getItem("saved")!);
  console.log(savedPosts);
  const [offSet] = useState(20);

  return (
    <div className="flex flex-wrap mt-[50px] ml-[100px] items-start justify-start gap-5">
      {savedPosts?.map((post: any) => (
        <div key={post._id}>
          <Poster data={savedPosts} offSet={offSet} />
        </div>
      ))}
    </div>
  );
};

export default Saved;
