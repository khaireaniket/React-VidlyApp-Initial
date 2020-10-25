import React from "react";
import PropTypes from "prop-types";
import { numberToArray } from "../../utilities/utils";

const Pagination = ({ totalMovies, pageSize, currentPage, onPageChange }) => {
  const pageCount =
    Math.floor(totalMovies / pageSize) + (totalMovies % pageSize === 0 ? 0 : 1);

  const pages = numberToArray(pageCount);
  if (pages.length === 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={page}
              onClick={() => onPageChange(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalMovies: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
