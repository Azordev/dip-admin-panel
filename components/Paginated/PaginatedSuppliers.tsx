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
  const pageNumber = Math.ceil(totalProvidersLength / ProvidersPerPage)
  const pageNumbers = Array.from({ length: pageNumber }, (_, index) => index + 1)
  const slicedProviders = providers.slice(indexOfFirstProvider, indexOfLastProvider)
  return (
    <div className={styles.container}>
      <div className={styles['paginated-container']}>
        <div className={styles['pages-number']}>
          <label>
            {slicedProviders.length * CurrentPage} of {totalProvidersLength}
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
              if (CurrentPage !== pageNumber) setCurrentPage(CurrentPage + 1)
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
