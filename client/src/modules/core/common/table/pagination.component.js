import React, { useState, useEffect } from "react";

const Pagination = ({ data, itemsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        onPageChange(
            data.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
            )
        );
    }, [currentPage, data, itemsPerPage, onPageChange]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
