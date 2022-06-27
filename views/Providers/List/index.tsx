import { FC } from 'react'

import { Provider } from '@/services/GraphQL/providers/types'
import styles from '@/styles/Home.module.css'

const ProvidersList: FC<{ providers: Provider[] }> = ({ providers }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Proveedores</h1>

    {providers.map(provider => (
      <div key={provider.id} className={styles.card}>
        <h2>{provider.commercialName}</h2>
        <p>{provider.salesPhone}</p>
      </div>
    ))}
  </div>
)

export default ProvidersList
