import Image from 'next/image'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

import Icons8 from '@/views/Shared/Icons8'

import styles from './ListHeader.module.scss'

export interface ListHeaderProps {
  createPath: string
  createText: string
  parent?: string | ReactNode
  parentPath?: string
  logoUrl?: string
  altLogo?: string
}

const ListHeader: FC<ListHeaderProps> = ({ createPath, createText, logoUrl, altLogo }) => (
  <nav className={styles.nav}>
    <Link href={createPath} passHref>
      <a>
        <Icons8 name="plus--v1" iconStyle="ios" />
        <span className={styles.title}>{createText}</span>
      </a>
    </Link>
    {logoUrl ? (
      <Image src={logoUrl || ''} alt={altLogo || 'default alt'} width={36} height={48} objectFit="contain" />
    ) : (
      <h1>{altLogo}</h1>
    )}
  </nav>
)

export default ListHeader
