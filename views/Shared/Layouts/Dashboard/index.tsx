import Link from 'next/link'
import { FC, ReactNode } from 'react'

import useAuth from '@/hooks/useAuth'
import LogoDID from '@/views/SVGs/LogoDID/LogoDID'

import styles from './Dashboard.module.scss'
import Icons8 from '../../Icons8'

import icon from './white-check-bag.svg'

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
          <Link href="/eventos" passHref>
            <a>
              <Icons8 size={48} className={styles.icons} color="ffffff" iconStyle="ios-filled" name="health-calendar" />
              <span>Eventos</span>
            </a>
          </Link>
          <Link href="/proveedores" passHref>
            <a>
              <Icons8 localSrc={icon} size={48} className={styles.icons} color="ffffff" iconStyle="ios-filled" name="shopaholic" />
              <span>Proveedores</span>
            </a>
          </Link>
          <Link href="/socios" passHref>
            <a>
              <Icons8 size={48} className={styles.icons} color="ffffff" iconStyle="ios-filled" name="groups" />
              <span>Socios</span>
            </a>
          </Link>
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
