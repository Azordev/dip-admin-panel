import styles from './Paginated.module.scss'

interface PaginatedProps<T> {
  data: T[]
  itemsPerPage: number
  totalItemsLength: number
  setCurrentPage: (_value: number) => void
  currentPage: number
  indexOfFirst: number
  indexOfLast: number
}
const Paginated = <T extends object>(props: PaginatedProps<T>) => {
  const { itemsPerPage, totalItemsLength, setCurrentPage } = props
  const { currentPage, indexOfFirst, indexOfLast } = props

  const pageNumber = Math.ceil(totalItemsLength / itemsPerPage)
  const pageNumbers = Array.from({ length: pageNumber }, (_, index) => index + 1)

  return (
    <div className={styles.container}>
      <div className={`${styles['paginated-container']} ${styles['paginated-container-relative']}`}>
        <div className={styles['pages-number']}>
          <label>
            {indexOfFirst + 1} a {indexOfLast} de {totalItemsLength}
          </label>
        </div>
        <ul>
          <div
            className={styles.button}
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1)
            }}
          >
            <span>Antes</span>
          </div>
          <div className={styles['pages-list']}>
            {pageNumbers &&
              pageNumbers.map(page =>
                currentPage === page ? (
                  <li className={styles.active} key={page} onClick={() => setCurrentPage(page)}>
                    {page}
                  </li>
                ) : (
                  <li key={page} onClick={() => setCurrentPage(page)}>
                    {page}
                  </li>
                ),
              )}
          </div>
          <div
            className={styles.button}
            onClick={() => {
              if (currentPage !== pageNumber) setCurrentPage(currentPage + 1)
            }}
          >
            <span>Siguiente</span>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Paginated
