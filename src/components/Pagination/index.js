import React from 'react';

const Pagination = props => {
  const {
    currentPage,
    totalPage,
    handlePagination
  } = props;
  return (
    <React.Fragment>
      <p>Page: {currentPage} / {totalPage}</p>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <a className="pagination-previous" onClick={() => handlePagination('down')}
        >&lt;</a>
        <a className="pagination-next" onClick={() => handlePagination('up')}>&gt;</a>
      </nav>
    </React.Fragment>
  )
}

export default Pagination;
