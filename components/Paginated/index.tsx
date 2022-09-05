import { FC } from 'react'

import { User } from '@/services/GraphQL/users/types'

import styles from './Paginated.module.scss'

interface PaginatedPartnersProps {
  users: User[]
  PartnersPerPage: number
  totalPartnersLength: number
  setCurrentPage: (value: number) => void
  CurrentPage: number
  indexOfFirstPartner: number
  indexOfLastPartner: number
}
const Paginated: FC<PaginatedPartnersProps> = ({
  PartnersPerPage,
  totalPartnersLength,
  setCurrentPage,
  CurrentPage,
  users,
  indexOfFirstPartner,
  indexOfLastPartner,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPartnersLength / PartnersPerPage); i++) {
    pageNumbers.push(i)
  }
  const slicedPartners = users.slice(indexOfFirstPartner, indexOfLastPartner)
  return (
    <div className={styles.container}>
      <div className={styles['paginated-container']}>
        <div className={styles['pages-number']}>
          <label>
            {slicedPartners.length * CurrentPage} of {totalPartnersLength}
          </label>
        </div>
        <ul>
          <div
            className={styles.button}
            onClick={() => {
              if (CurrentPage !== 1) setCurrentPage(CurrentPage - 1)
            }}
          >
            <span>Antes</span>
          </div>
          <div className={styles['pages-list']}>
            {pageNumbers &&
              pageNumbers.map(page =>
                CurrentPage === page ? (
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
              if (CurrentPage !== Math.ceil(totalPartnersLength / PartnersPerPage)) setCurrentPage(CurrentPage + 1)
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
