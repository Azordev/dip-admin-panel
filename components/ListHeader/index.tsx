import Link from 'next/link'
import { FC, ReactNode } from 'react'

import Icons8 from '@/views/Shared/Icons8'

import styles from './ListHeader.module.scss'

export interface ListHeaderProps {
  createPath: string
  createText: string
  parent?: string | ReactNode
  parentPath?: string
}

const ListHeader: FC<ListHeaderProps> = ({ createPath, createText, parent }) => (
  <nav className={styles.nav}>
    <Link href={createPath} passHref replace>
      <a>
        <Icons8 name="plus--v1" iconStyle="ios" />
        <span>{createText}</span>
      </a>
    </Link>
    <h1>{parent}</h1>
  </nav>
)

export default ListHeader
