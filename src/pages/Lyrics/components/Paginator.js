import React, { useState, useEffect } from 'react';

const Paginate = (props) => {
  const { handlerPagechange, totalPage, pageNo } = props;
  const [currentPage, setCurrentPage] = useState(pageNo);
  let maxPages = totalPage || 1;
  let items = [];
  let leftSide = currentPage - 5;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 5;
  if (rightSide > maxPages) rightSide = maxPages;

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div key={number} className={(number === currentPage ? 'round-effect active' : 'round-effect')} onClick={() => { setCurrentPage(number) }}>
        {number}
      </div>,
    );
  }

  useEffect(() => {
    setCurrentPage(pageNo)
  }, [pageNo]);

  useEffect(() => {
    handlerPagechange(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const paginationRender = (
      <div className="paginate-ctn">
        <div className="round-effect" onClick={prevPage}> &lsaquo; </div>
        {items}
        <div className="round-effect" onClick={nextPage}> &rsaquo; </div>
      </div>
  );
  return (paginationRender);
}

export default Paginate;