import { FC, useMemo } from 'react'

import Switch from '@/components/CustomSwitch'
import ListHeader from '@/components/ListHeader'
import Table, { TableData } from '@/components/Table'
import { User } from '@/services/GraphQL/users/types'

import styles from './userlist.module.scss'

const UsersList: FC<{ users: User[]; indexOfFirstPartner: number; indexOfLastPartner: number }> = ({
  users,
  indexOfFirstPartner,
  indexOfLastPartner,
}) => {
  const headers = ['CÓDIGO', 'Fecha', 'Socio', 'Correo electrónico', 'Contraseña', 'Estado']
  const sliceUsers = users.slice(indexOfFirstPartner, indexOfLastPartner)

  const data: TableData[] = useMemo(() => {
    return sliceUsers.map(user => {
      const name = `${user.memberInfo?.firstNames} ${user.memberInfo?.lastNames}`
      const Active = () => (
        <span className={user.isActive ? styles.active : styles.inactive}>{user.isActive ? 'Activo' : 'Inactivo'}</span>
      )
      const Actions = () => (
        <div>
          <Switch isChecked={user?.isActive ?? false} onChange={value => console.log(value)} />
          <button>Edit</button>
        </div>
      )

      return {
        id: user.id,
        items: [
          user.id,
          user.createdAt,
          name,
          user.memberInfo?.email,
          '**********',
          <Active key={`active-${user.id}`} />,
          <Actions key={`actions-${user.id}`} />,
        ],
      }
    })
  }, [sliceUsers])

  return (
    <div className={styles['userlist-container']}>
      <ListHeader createText="Añadir socio" createPath="/socios/crear" />
      <div className={styles.container}>
        <Table headers={headers} data={data} />
      </div>
    </div>
  )
}

export default UsersList
