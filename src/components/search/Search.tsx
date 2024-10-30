import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
      <form action="">
        <div className="relative mb-6 flex items-center justify-center  ">
          <input
            type="text"
            placeholder="Search Creators"
            className="w-full p-4 pl-10 rounded-full bg-gray-800 text-gray-300 placeholder-gray-500 "
          />
          <FaSearch className="absolute left-4  text-gray-500" />
        </div>
      </form>
    </div>
  );
};

export default Search;
