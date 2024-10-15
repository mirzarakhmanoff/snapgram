import stories1 from "../../assets/storyImg.jpeg";
import stories2 from "../../assets/storiImg2.jpeg";
import stories3 from "../../assets/storyImg2.jpeg";
import stories4 from "../../assets/storyImg3.jpeg";
import stories5 from "../../assets/storyImg4.jpeg";
import stories6 from "../../assets/storyImg5.jpeg";

const creators = [
  { id: 1, name: "Savannah Nguyen", img: stories1 },
  { id: 2, name: "Wade Warren", img: stories2 },
  { id: 3, name: "Dianne Russell", img: stories3 },
  { id: 4, name: "Robert Fox", img: stories4 },
  { id: 5, name: "Ronald Richards", img: stories5 },
  { id: 6, name: "Jane Cooper", img: stories6 },
  { id: 7, name: "Courtney Henry", img: stories6 },
  { id: 8, name: "Annette Black", img: stories1 },
];

const Creators = () => {
  return (
    <div className="bg-black p-6">
      <h2 className="text-2xl text-white mb-4">Top Creators</h2>
      <div className="grid grid-cols-2 gap-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={creator.img}
              alt={creator.name}
              className="w-24 h-24 rounded-full mb-2"
            />
            <h3 className="text-white">{creator.name}</h3>
            <p className="text-gray-400">Followed by jsmastery</p>
            <button className="mt-2 bg-purple-600 text-white rounded-full px-4 py-1 hover:bg-purple-700 transition-all">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creators;
