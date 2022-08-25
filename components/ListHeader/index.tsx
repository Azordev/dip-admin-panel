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

const ListHeader: FC<ListHeaderProps> = ({ createPath, createText, parent, logoUrl, altLogo }) => (
  <nav className={styles.nav}>
    <Link href={createPath} passHref replace>
      <a>
        <Icons8 name="plus--v1" iconStyle="ios" />
        <span>{createText}</span>
      </a>
    </Link>
    {logoUrl ? (
      <Image src={logoUrl || ''} alt={altLogo || 'default alt'} width={120} height={15} objectFit="contain" />
    ) : (
      <h1>{parent}</h1>
    )}
  </nav>
)

export default ListHeader
