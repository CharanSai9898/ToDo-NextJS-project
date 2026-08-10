import type { PaginationProps } from "@/types/todo";

const Pagination = ({
  page,
  totalPages,
  totalRecords,
  limit,
  onPageChange,
}: PaginationProps) => {
  const startRecord = totalRecords === 0 ? 0 : (page - 1) * limit + 1;

  const endRecord = Math.min(page * limit, totalRecords);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const hasData = totalRecords > 0 && totalPages > 0;
  const isFirstPage = !hasData || page === 1;
  const isLastPage = !hasData || page >= totalPages;

  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-white">
        Showing{" "}
        <span className="font-semibold">
          {startRecord}-{endRecord}
        </span>{" "}
        of <span className="font-semibold">{totalRecords}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={isFirstPage}
          className={`px-4 py-2 rounded transition
            ${
              isFirstPage
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          Previous
        </button>

        {pages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-10 h-10 rounded transition
              ${
                page === number
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={isLastPage}
          className={`px-4 py-2 rounded transition
            ${
              isLastPage
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
