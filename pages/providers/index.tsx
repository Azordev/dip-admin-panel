import type { NextPage } from 'next'
import type { IProvider } from '../../utils/types'
import { useQuery } from '@apollo/client'
import { GET_PROVIDERS } from '../../services/GraphQL/queries/providers.queries'
import styles from '../../styles/Home.module.css'

const Providers: NextPage = () => {
  const { data, loading } = useQuery(GET_PROVIDERS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  const providers: IProvider[] = data.providers

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Providers</h1>

      {providers.map(provider => (
        <div key={provider.id} className={styles.card}>
          <h2>{provider.legal_name}</h2>
          <p>{provider.address}</p>
          <p>
            {provider.b2b_phone} - {provider.b2b_email}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Providers
