import Link from 'next/link'
import { FC, ReactNode } from 'react'

import useAuth from '@/hooks/useAuth'
import LogoDID from '@/views/SVGs/LogoDID/LogoDID'

import styles from './Dashboard.module.scss'

interface Props {
  children: ReactNode
}
const Dashboard: FC<Props> = ({ children }) => {
  const { logOut } = useAuth()
  return (
    <>
      <aside className={styles.sidebar}>
        <nav>
          <Link href="/" passHref>
            <a>
              <LogoDID />
            </a>
          </Link>
          <Link href="/eventos">Eventos</Link>
          <Link href="/proveedores">Proveedores</Link>
          <Link href="/socios">Socios</Link>
        </nav>
        <button className={styles.button} onClick={logOut}>
          Cerrar Sesión
        </button>
      </aside>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default Dashboard
