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

      const Active = () => (
        <span className={isActive ? styles.active : styles.inactive}>
          {isActive ? "Activo" : "Inactivo"}
        </span>
      );

      return {
        id: user.id,
        items: [
          user.id,
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
      <ListHeader createText="Añadir socio" createPath="/socios/crear" />
      <div className={styles.container}>
        <Table headers={headers} data={data} />
      </div>
      {/* TODO: Colocar paginacion */}
    </div>
  );
};

export default UsersList;
