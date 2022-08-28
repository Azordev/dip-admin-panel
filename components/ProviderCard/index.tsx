import Image from 'next/image'
import { FC } from 'react'

import { Provider } from '@/services/GraphQL/providers/types'

import styles from './ProviderCard.module.scss'
const ProviderCard: FC<{ provider: Provider }> = ({ provider }) => {
  return (
    <>
      {provider && (
        <div className={styles.card}>
          <div className={styles['provider-logo']}>
            {provider.logoUrl ? (
              <Image
                src={provider.logoUrl}
                alt={provider.commercialName}
                width={170}
                height={122}
                objectFit="contain"
              />
            ) : (
              <Image
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="default"
                width={170}
                height={122}
                objectFit="contain"
              />
            )}
          </div>
          <div className={styles['provider-info']}>
            <div className={styles['top-right']}>
              <label>S/. --</label>
            </div>
            <div className={styles.center}>
              <h3>{provider.commercialName}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProviderCard
