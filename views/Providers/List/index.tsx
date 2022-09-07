import { FC, useCallback, useMemo, useState } from 'react'

import Table, { TableData } from '@/components/Table'
import Actions from '@/components/Table/Actions'
import { Provider } from '@/services/GraphQL/providers/types'

import styles from './List.module.scss'

const ProvidersList: FC<{ providers: Provider[] }> = ({ providers: dbProviders }) => {
  const [providers, setProviders] = useState(dbProviders)
  const headers = ['Rango', 'Fecha', 'Empresa', 'Usuario', 'Contraseña', 'Estado']

  const handleSwitchProvider = useCallback(
    (value: boolean, providerId: Provider['id']) => {
      const newProviders = providers.map(provider => {
        if (provider.id === providerId) {
          return { ...provider, isActive: value }
        }
        return provider
      })

      setProviders(newProviders)
    },
    [providers],
  )

  const data: TableData[] = useMemo(() => {
    const Active = ({ active }: { active: boolean }) => {
      return <span className={active ? styles.active : styles.inactive}>{active ? 'Activo' : 'Inactivo'}</span>
    }

    return providers.map(provider => {
      const isActive = Boolean(provider?.isActive)
      return {
        id: provider.id,
        items: [
          provider.id,
          provider.createdAt,
          provider.commercialName,
          'email@gmail.com',
          '**********',
          <Active key={`${provider.id}-active`} active={isActive} />,
          <Actions
            key={`${provider.id}-actions`}
            editLink={`/proveedores/editar/${provider.id}`}
            showSwitch
            isCheckedSwitch={isActive}
            onSwitchChange={value => handleSwitchProvider(value, provider.id)}
          />,
        ],
      }
    })
  }, [providers, handleSwitchProvider])

  return (
    <div className={styles.container}>
      <div className={styles['table-container']}>
        <Table headers={headers} data={data} />
      </div>
    </div>
  )
}

export default ProvidersList
