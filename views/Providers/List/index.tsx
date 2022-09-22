import { FC, useEffect, useMemo, useState } from 'react'

import Table, { TableData } from '@/components/Table'
import Actions from '@/components/Table/Actions'
import { Provider } from '@/services/GraphQL/providers/types'

import styles from './List.module.scss'

const ProvidersList: FC<{
  providers: Provider[]
  indexOfLastProvider: number
  indexOfFirstProvider: number
}> = ({ providers: dbProviders, indexOfLastProvider, indexOfFirstProvider }) => {
  const [providers, setProviders] = useState(dbProviders.slice(indexOfFirstProvider, indexOfLastProvider))
  const headers = ['Rango', 'Fecha', 'Empresa', 'Usuario', 'Contraseña', 'Estado']

  const handleSwitchProvider = async (isActive: boolean, providerId: Provider['id']) => {
    await fetch(`/api/providers/${providerId}?is-active=${isActive}`, {
      method: 'PATCH',
    })
  }

  const data: TableData[] = useMemo(() => {
    const Active = ({ active }: { active: boolean }) => {
      return <span className={active ? styles.active : styles.inactive}>{active ? 'Activo' : 'Inactivo'}</span>
    }

    return providers.map(provider => {
      const isActive = Boolean(provider?.isActive)
      return {
        id: provider.id,
        items: [
          provider.orderIndex,
          provider.startDate,
          provider.commercialName,
          provider.b2bEmail,
          '**********',
          <Active key={`${provider.id}-active-${isActive}`} active={isActive} />,
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
  }, [providers])
  useEffect(() => {
    setProviders(dbProviders.slice(indexOfFirstProvider, indexOfLastProvider))
  }, [dbProviders, indexOfFirstProvider, indexOfLastProvider])

  return (
    <div>
      <div className={styles['table-container']}>
        <Table headers={headers} data={data} />
      </div>
    </div>
  )
}

export default ProvidersList
