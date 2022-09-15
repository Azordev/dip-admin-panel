import { FC, useState } from 'react'

import ListHeader from '@/components/ListHeader'
import styles from '@/components/Paginated/Paginated.module.scss'
import PaginatedSuppliers from '@/components/Paginated/PaginatedSuppliers'
import { Provider } from '@/services/GraphQL/providers/types'
import ProvidersList from '@/views/Providers/List'

interface PaginatedSuppliersProps {
  providers: Provider[]
}

const ProviderContainers: FC<PaginatedSuppliersProps> = ({ providers }) => {
  const [CurrentPage, setCurrentPage] = useState(1)
  const ProvidersPerPage = 12
  const indexOfLastProvider = CurrentPage * ProvidersPerPage
  const indexOfFirstProvider = indexOfLastProvider - ProvidersPerPage
  return (
    <div className={styles.relative}>
      <ListHeader createText="Crear nuevo proveedor" createPath="/proveedores/crear" />
      <ProvidersList
        providers={providers}
        indexOfLastProvider={indexOfLastProvider}
        indexOfFirstProvider={indexOfFirstProvider}
      />
      <PaginatedSuppliers
        ProvidersPerPage={ProvidersPerPage}
        totalProvidersLength={providers.length}
        providers={providers}
        setCurrentPage={setCurrentPage}
        CurrentPage={CurrentPage}
        indexOfFirstProvider={indexOfFirstProvider}
        indexOfLastProvider={indexOfLastProvider}
      />
    </div>
  )
}

export default ProviderContainers
