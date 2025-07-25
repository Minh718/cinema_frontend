import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ page = 0, pageCount, handlePageClick }) {
  return (
    <ReactPaginate
      forcePage={page}
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount} // Ensure pageCount is defined
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick} // Ensure handlePageClick is defined
      containerClassName={"flex justify-center mt-8 space-x-2 cursor-pointer"}
      pageClassName={"rounded-md  shadow-sm"} // Removed padding here
      pageLinkClassName={
        "px-3 py-2 inline-block text-gray-700 hover:text-gray-900"
      } // Added padding to the link
      activeClassName={"bg-blue-500 bg-black cursor-not-allowed"}
      activeLinkClassName={"text-blue-500 font-bol d"} // Active state applies to link
      previousClassName={"rounded-md  shadow-sm"}
      nextClassName={"rounded-md  shadow-sm"}
      previousLinkClassName={
        "px-3 py-2 inline-block text-gray-700 hover:text-gray-900"
      } // Added padding here
      nextLinkClassName={
        "px-3 py-2 inline-block text-gray-700 hover:text-gray-900"
      } // Added padding here
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  );
}
