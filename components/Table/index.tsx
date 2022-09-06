import { FC, ReactNode } from 'react'

import styles from './Table.module.scss'

export interface TableData {
  id: number | string
  items: ReactNode[]
}

interface Props {
  headers: string[]
  data: TableData[]
}

const Table: FC<Props> = ({ data, headers }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header, id) => (
              <th scope="col" className={styles.th} key={`table-header-${header}-${id}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {row.items.map((item, i) => (
                <td className={styles.td} key={`table-rows-${row.id}-${i}`}>
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
