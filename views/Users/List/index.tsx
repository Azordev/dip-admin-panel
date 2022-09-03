<<<<<<< HEAD
import { FC, useCallback, useMemo, useState } from "react";

import ListHeader from "@/components/ListHeader";
import Table, { TableData } from "@/components/Table";
import TableActions from "@/components/Table/Actions";
import { User } from "@/services/GraphQL/users/types";

import styles from "./userlist.module.scss";

const UsersList: FC<{
  users: User[];
  indexOfFirstPartner: number;
  indexOfLastPartner: number;
}> = ({ users: dbUsers, indexOfFirstPartner, indexOfLastPartner }) => {
  const [users, setUsers] = useState(
    dbUsers.slice(indexOfFirstPartner, indexOfLastPartner)
  );
  const headers = [
    "CÓDIGO",
    "Fecha",
    "Socio",
    "Correo electrónico",
    "Contraseña",
    "Estado",
  ];

  const handleSwitchUser = useCallback(
    (value: boolean, userId: User["id"]) => {
      const newUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, isActive: value };
        }
        return user;
      });

      setUsers(newUsers);
      // TODO: ACTUALIZAR ESTADO ACTIVO DE USUARIO EN LA BASE DE DATOS
    },
    [users]
  );

  const data: TableData[] = useMemo(() => {
    return users.map((user) => {
      const name = `${user.memberInfo?.firstNames} ${user.memberInfo?.lastNames}`;
      const isActive = Boolean(user?.isActive);
      const code = `#${user.memberCode}`;

      const Active = () => (
        <span
          className={`${styles.status} ${
            isActive ? styles.active : styles.inactive
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </span>
      );

      return {
        id: user.id,
        items: [
          code,
          user.createdAt,
          name,
          user.memberInfo?.email,
          "**********",
          <Active key={`active-${user.id}`} />,
          <TableActions
            key={`actions-${user.id}`}
            showSwitch
            editLink={`/socios/editar/${user.id}`}
            onSwitchChange={(value) => handleSwitchUser(value, user.id)}
            isCheckedSwitch={isActive}
          />,
        ],
      };
    });
  }, [users, handleSwitchUser]);

  return (
    <div className={styles["userlist-container"]}>
=======
import { FC, useMemo } from 'react'

import Switch from '@/components/CustomSwitch'
import ListHeader from '@/components/ListHeader'
import Table, { TableData } from '@/components/Table'
import { User } from '@/services/GraphQL/users/types'

import styles from './List.module.scss'

const UsersList: FC<{ users: User[] }> = ({ users }) => {
  const headers = ['CÓDIGO', 'Fecha', 'Socio', 'Correo electrónico', 'Contraseña', 'Estado']

  const data: TableData[] = useMemo(() => {
    return users.map(user => {
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
  }, [users])

  return (
    <div>
>>>>>>> b371e4e (feat: added table to show the users)
      <ListHeader createText="Añadir socio" createPath="/socios/crear" />
      <div className={styles.container}>
        <Table headers={headers} data={data} />
      </div>
<<<<<<< HEAD
      {/* TODO: Colocar paginacion */}
    </div>
  );
};
=======
    </div>
  )
}
>>>>>>> b371e4e (feat: added table to show the users)

export default UsersList;
