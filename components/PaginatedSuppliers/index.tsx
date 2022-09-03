import { FC } from 'react'

import { Provider } from '@/services/GraphQL/providers/types'

import styles from './Paginated.module.scss'

interface PaginatedSuppliersProps {
  providers: Provider[]
  ProvidersPerPage: number
  totalProvidersLength: number
  setCurrentPage: (value: number) => void
  CurrentPage: number
  indexOfFirstProvider: number
  indexOfLastProvider: number
}
const PaginatedSuppliers: FC<PaginatedSuppliersProps> = ({
  ProvidersPerPage,
  totalProvidersLength,
  setCurrentPage,
  CurrentPage,
  providers,
  indexOfFirstProvider,
  indexOfLastProvider,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalProvidersLength / ProvidersPerPage); i++) {
    pageNumbers.push(i)
  }
  const slicedProviders = providers.slice(indexOfFirstProvider, indexOfLastProvider)
  return (
    <div className={styles['paginated-container']}>
      <div className={styles['pages-number']}>
        <label>
          {slicedProviders.length * CurrentPage} of {totalProvidersLength}
        </label>
      </div>
      <div className={styles.right}>
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
              if (CurrentPage !== Math.ceil(totalProvidersLength / ProvidersPerPage)) setCurrentPage(CurrentPage + 1)
            }}
          >
            <span>Siguiente</span>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default PaginatedSuppliers
