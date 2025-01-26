import React from 'react';

const Pagination = () => {
    return (
        <div className="pagination">
            <button className="prev-btn">&lt; Previous</button>
            <span className="page-number">1</span>
            <button className="next-btn">Next &gt;</button>
        </div>
    );
};

export default Pagination;
