import { useSelector } from "react-redux";
import "./pagination.css";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const { productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const pageCount = Math.ceil(productsCount / resultPerPage) || 0;
  const prevButtonDisabled = currentPage === 1;
  const nextButtonDisabled = pageCount === 0 || currentPage === pageCount;

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(
          <a
            key={i}
            href="#"
            index={String(i)}
            className={currentPage === i ? "active page-number" : "page-number"}
            onClick={() => handlePageNumberClick(i)}
          >
            {i || null}
          </a>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(
            <a
              key={i}
              href="#"
              index={String(i)}
              className={
                currentPage === i ? "active page-number" : "page-number"
              }
              onClick={() => handlePageNumberClick(i)}
            >
              {i || null}
            </a>
          );
        }
        pageNumbers.push(
          <span className="page-number" key="ellipsis1">
            ...
          </span>
        );
        pageNumbers.push(
          <a
            key={pageCount}
            href="#"
            index={String(pageCount)}
            className={
              currentPage === pageCount ? "active page-number" : "page-number"
            }
            onClick={() => handlePageNumberClick(pageCount)}
          >
            {pageCount || null}
          </a>
        );
      } else if (currentPage >= pageCount - 3) {
        pageNumbers.push(
          <a
            key={1}
            href="#"
            index={String(1)}
            className={currentPage === 1 ? "active page-number" : "page-number"}
            onClick={() => handlePageNumberClick(1)}
          >
            1
          </a>
        );
        pageNumbers.push(
          <span className="page-number" key="ellipsis2">
            ...
          </span>
        );
        for (let i = pageCount - 4; i <= pageCount; i++) {
          pageNumbers.push(
            <a
              key={i}
              href="#"
              index={String(i)}
              className={
                currentPage === i ? "active page-number" : "page-number"
              }
              onClick={() => handlePageNumberClick(i)}
            >
              {i || null}
            </a>
          );
        }
      } else {
        pageNumbers.push(
          <a
            key={1}
            href="#"
            index={String(1)}
            className={currentPage === 1 ? "active page-number" : "page-number"}
            onClick={() => handlePageNumberClick(1)}
          >
            1
          </a>
        );
        pageNumbers.push(
          <span className="page-number" key="ellipsis3">
            ...
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <a
              key={i}
              href="#"
              index={String(i)}
              className={
                currentPage === i ? "active page-number" : "page-number"
              }
              onClick={() => handlePageNumberClick(i)}
            >
              {i || null}
            </a>
          );
        }
        pageNumbers.push(
          <span className="page-number" key="ellipsis4">
            ...
          </span>
        );
        pageNumbers.push(
          <a
            key={pageCount}
            href="#"
            index={String(pageCount)}
            className={
              currentPage === pageCount ? "active page-number" : "page-number"
            }
            onClick={() => handlePageNumberClick(pageCount)}
          >
            {pageCount || null}
          </a>
        );
      }
    }

    return pageNumbers;
  };

  const handlePageNumberClick = (i) => {
    setCurrentPage(i);
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={(e) => setCurrentPage(currentPage - 1)}
          title="Previous page"
          className={
            prevButtonDisabled ? "control disabled btn" : "control btn"
          }
          disabled={prevButtonDisabled}
        >
          &lt;
        </button>

        <div className="page-numbers">{getPageNumbers()}</div>

        <button
          onClick={(e) => setCurrentPage(currentPage + 1)}
          title="Next page"
          className={
            nextButtonDisabled ? "control disabled btn" : "control btn"
          }
          disabled={nextButtonDisabled}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
