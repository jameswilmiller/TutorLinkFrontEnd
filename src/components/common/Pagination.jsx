function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const isFirst = currentPage === 0;
    const isLast = currentPage >= totalPages - 1;

    return (
        <div className="flex items-center justify-center gap-3 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirst}
                className="px-4 py-2 border border-tl-border rounded-xl text-sm text-tl-ink hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
                Previous
            </button>

            <span className="text-sm text-tl-muted">
                Page {currentPage + 1} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLast}
                className="px-4 py-2 border border-tl-border rounded-xl text-sm text-tl-ink hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;