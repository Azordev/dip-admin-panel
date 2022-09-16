import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'

import Table, { TableData } from '@/components/Table'
import TableActions from '@/components/Table/Actions'
import { User } from '@/services/GraphQL/users/types'

import styles from './userlist.module.scss'

const UsersList: FC<{
  users: User[]
  indexOfFirstPartner: number
  indexOfLastPartner: number
}> = ({ users: dbUsers, indexOfFirstPartner, indexOfLastPartner }) => {
  const [users, setUsers] = useState(dbUsers.slice(indexOfFirstPartner, indexOfLastPartner))
  const { reload } = useRouter()
  const headers = ['CÓDIGO', 'Fecha', 'Socio', 'Correo electrónico', 'Contraseña', 'Estado']

  const handleSwitchUser = async (isActive: boolean, userId: User['id']) => {
    await fetch(`/api/members/${userId}?is-active=${!isActive}`, { method: 'PATCH' })
    reload()
  }

  const data: TableData[] = useMemo(() => {
    return users.map(user => {
      const name = `${user.memberInfo?.firstNames} ${user.memberInfo?.lastNames}`
      const isActive = Boolean(user?.isActive)
      const code = `#${user.memberCode}`

      const Active = () => (
        <span className={`${styles.status} ${isActive ? styles.active : styles.inactive}`}>
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
      )

      return {
        id: user.id,
        items: [
          code,
          user.createdAt,
          name,
          user.memberInfo?.email,
          '**********',
          <Active key={`active-${user.id}`} />,
          <TableActions
            key={`actions-${user.id}`}
            showSwitch
            editLink={`/socios/editar/${user.id}`}
            onSwitchChange={value => handleSwitchUser(value, user.id)}
            isCheckedSwitch={isActive}
          />,
        ],
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  useEffect(() => {
    setUsers(dbUsers.slice(indexOfFirstPartner, indexOfLastPartner))
  }, [dbUsers, indexOfFirstPartner, indexOfLastPartner])

  return (
    <div>
      <div className={styles.users}>
        <Table headers={headers} data={data} />
      </div>
    </div>
  )
}

export default UsersList
