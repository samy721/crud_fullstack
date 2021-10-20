import ReactPaginate from 'react-paginate';

export const Paginate = (props) => {

    return(
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={props.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e)=>props.handlePageChange(e.selected + 1)}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
    )
}