import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import styles from '../../styles/Home.module.css'
import ClientOnly from '../../views/Shared/ClientOnly'
import { Provider } from '../../services/GraphQL/types/providers'
import { GET_PROVIDERS } from '../../services/GraphQL/queries/providers'

const Providers: NextPage = () => {
  const { data, loading } = useQuery(GET_PROVIDERS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  const providers: Provider[] = data.providers

  return (
    <ClientOnly>
      <div className={styles.container}>
        <h1 className={styles.title}>Proveedores</h1>

        {providers.map(provider => (
          <div key={provider.id} className={styles.card}>
            <h2>{provider.commercial_name}</h2>
            <p>{provider.address}</p>
            <p>
              {provider.address} - {provider.sales_phone}
            </p>
          </div>
        ))}
      </div>
    </ClientOnly>
  )
}

export default Providers
