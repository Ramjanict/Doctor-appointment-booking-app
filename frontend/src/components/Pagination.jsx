import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = ({
  totalPost,
  postPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  const handleLeft = () => {
    if (currentPage > 1) {
      setCurrentPage((pre) => pre - 1);
    }
  };
  const handleRight = () => {
    if (pages.length > currentPage) {
      setCurrentPage((pre) => pre + 1);
    }
  };

  return (
    <div className="w-fit mx-auto p-4 rounded-md bg-white shadow">
      <div className="flex items-center gap-4">
        <div
          onClick={handleLeft}
          className={`text-2xl p-2 rounded ${
            currentPage > 1 ? "bg-blue-50 cursor-pointer" : ""
          } `}
        >
          <IoIosArrowBack />
        </div>

        {pages.map((page, index) => {
          return (
            <button
              className={
                page == currentPage
                  ? "bg-primary w-6 h-6 text-white flex items-center justify-center rounded"
                  : ""
              }
              onClick={() => {
                setCurrentPage(page);
              }}
              key={index}
            >
              {page}
            </button>
          );
        })}

        <div
          onClick={handleRight}
          className={`text-2xl p-2 rounded  ${
            pages.length > currentPage ? "bg-blue-50 cursor-pointer" : ""
          } `}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
