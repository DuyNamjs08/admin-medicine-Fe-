/* eslint-disable react/prop-types */
import { FaSearch } from "react-icons/fa";

const SearchCmp = ({ text = "Tìm kiếm sản phẩm", component = false }) => {
  return (
    <form
      className={`${
        component ? "w-[300px]" : "w-[200px] sm:w-[300px]"
      }  overflow-hidden`}
    >
      <div className="relative">
        <div
          onClick={() => alert("namdz")}
          className="cursor-pointer z-10 absolute end-[15px] bottom-[10px] flex items-center text-black"
        >
          <FaSearch />
        </div>
        <input
          type="text"
          className={`${
            component ? "rounded-[8px] w-full" : "rounded-full w-full"
          } h-[40px] block  px-2.5 text-sm text-gray-900 border  bg-gray-100 outline-none text-[14px] lg:text-[16px]`}
          placeholder={text}
        />
      </div>
    </form>
  );
};

export default SearchCmp;
