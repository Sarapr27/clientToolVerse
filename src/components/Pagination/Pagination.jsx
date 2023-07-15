import React from "react";
import style from "../Pagination/Pagination.module.css"; //para dar stilo al boton
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

export default function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const tools = useSelector((state) => state.allTools);
  const itemsPerPage = 12;
  const pageNumbers = Math.ceil(tools.length / itemsPerPage);

  const handleClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  const renderPageNumbers = Array.from({ length: pageNumbers }, (_, index) => index + 1);

  return (
    <nav>
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        Previous
      </button>
      {renderPageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? style : ""}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === pageNumbers}
        onClick={() => handleClick(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
