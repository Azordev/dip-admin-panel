import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { Provider } from '@/services/GraphQL/providers/types'
import { PROVIDERS } from '@/services/GraphQL/providers/queries'
import ClientOnly from '@/views/Shared/ClientOnly'
import styles from '@/styles/Home.module.css'

const Providers: NextPage = () => {
  const { data, loading } = useQuery(PROVIDERS)

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
