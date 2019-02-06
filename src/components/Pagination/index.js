import React from 'react';
import PaginationStyle from '../../styles/Pagination';
const Pagination = props => {
  const { currentPage, totalPage, handlePagination } = props;
  return (
    <React.Fragment>
      <p>
        Page: {currentPage} / {totalPage}
      </p>
      {totalPage !== 1 && (
        <PaginationStyle
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <button
            className="pagination-previous"
            href="#"
            onClick={() => handlePagination('down')}
          >
            &lt;
          </button>
          <button
            className="pagination-next"
            onClick={() => handlePagination('up')}
          >
            &gt;
          </button>
        </PaginationStyle>
      )}
    </React.Fragment>
  );
};

export default Pagination;
