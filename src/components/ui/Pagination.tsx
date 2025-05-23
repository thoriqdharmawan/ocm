import { cn } from "../../utils/classname";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const pageNumbers = [
    1,
    ...(showLeftDots ? ["..."] : []),
    ...range(leftSibling, rightSibling),
    ...(showRightDots ? ["..."] : []),
    totalPages,
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  return (
    <nav
      className={cn("d-flex justify-content-center", className)}
      aria-label="Pagination"
    >
      <ul
        className={cn(
          "pagination pagination-sm gap-1 m-0",
          "border-0 bg-transparent"
        )}
        style={{ background: "none" }}
      >
        <li
          className={cn("page-item", currentPage === 1 && "disabled")}
          style={{ border: "none", background: "none" }}
        >
          <button
            className={cn(
              "page-link rounded-circle border-0 bg-light text-dark p-0 d-flex align-items-center justify-content-center"
            )}
            style={{ width: 32, height: 32 }}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <li
              key={"dots-" + idx}
              className={cn("page-item disabled border-0 bg-transparent")}
              style={{ border: "none", background: "none" }}
            >
              <span
                className={cn(
                  "page-link border-0 bg-transparent text-secondary p-0"
                )}
                style={{
                  width: 32,
                  height: 32,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ...
              </span>
            </li>
          ) : (
            <li
              key={page}
              className={cn(
                "page-item rounded-circle",
                page === currentPage && "active border-0 bg-primary text-white",
                page !== currentPage && "border-0 bg-transparent"
              )}
              style={{ border: "none", background: "none" }}
            >
              <button
                className={cn(
                  "page-link rounded-circle border-0 p-0 d-flex align-items-center justify-content-center",
                  page === currentPage
                    ? "bg-primary text-white"
                    : "bg-light text-dark"
                )}
                style={{ width: 32, height: 32 }}
                onClick={() => onPageChange(Number(page))}
                tabIndex={page === currentPage ? -1 : 0}
              >
                {page}
              </button>
            </li>
          )
        )}
        <li
          className={cn("page-item", currentPage === totalPages && "disabled")}
          style={{ border: "none", background: "none" }}
        >
          <button
            className={cn(
              "page-link rounded-circle border-0 bg-light text-dark p-0 d-flex align-items-center justify-content-center"
            )}
            style={{ width: 32, height: 32 }}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
