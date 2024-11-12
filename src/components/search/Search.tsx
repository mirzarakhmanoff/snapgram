import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
      <form action="">
        <div className="relative mb-6 flex items-center justify-center  ">
          <input
            type="text"
            placeholder="Search Creators"
            className="w-full py-2  px-[35px] md:py-3  rounded-full bg-gray-800 text-gray-300 placeholder-gray-500 "
          />
          <FaSearch className="absolute left-3    text-gray-500" />
        </div>
      </form>
    </div>
  );
};

export default Search;
