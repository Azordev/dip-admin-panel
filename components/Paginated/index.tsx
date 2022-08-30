import styles from './Paginated.module.scss'
function Paginated(/* {
  setCurrentPage,
  currentPage,
  elementsPerPage,
  totalElements,
  paginated,
} */) {
  /* const pageNumbers = []

  for (
    let number = 1
    number <= Math.ceil(totalElements / elementsPerPage)
    number++
  ) {
    pageNumbers.push(number)
  }

  const forward = (pageNumber) => {
    setCurrentPage(
      pageNumber === pageNumbers.length ? pageNumber : pageNumber + 1
    )
  }

  const backward = (pageNumber) => {
    setCurrentPage(pageNumber === 1 ? pageNumber : pageNumber - 1)
  } */

  return (
    <div className={styles['paginated-container']}>
      {/*    {pageNumbers[0] && ( */}
      <div>
        <label htmlFor=""> 1 of 2 </label>
      </div>

      <div>
        <ul className="flex">
          <li className={styles.button} /* onClick={() => backward(currentPage)} */>Antes</li>
          {/*   {pageNumbers &&
            pageNumbers.map((number) => {
              if (currentPage === number)
                return ( */}
          <li
            className="py-1 px-3 m-1 flex text-center shadow-lg border-b-4 border-secondary rounded-lg"
            key={1}
            /* onClick={() => paginated(number)} */
          >
            {1}
          </li>
          <li
            className="py-1 px-3 m-1 flex text-center shadow-lg border-b-4 border-secondary rounded-lg"
            key={1}
            /* onClick={() => paginated(number)} */
          >
            {2}
          </li>
          <li
            className="py-1 px-3 m-1 flex text-center shadow-lg border-b-4 border-secondary rounded-lg"
            key={1}
            /* onClick={() => paginated(number)} */
          >
            {3}
          </li>
          {/* ) */}
          {/*  else
                return ( */}
          {/* <StyledLi key={number} onClick={() => paginated(number)}>
                    {number}
                    </StyledLi>
                  ) */}
          {/*  })} */}
          <li className={styles.button} /* onClick={() => forward(currentPage)} */>Siguiente</li>
        </ul>
        {/*  )} */}
      </div>
    </div>
  )
}

export default Paginated
