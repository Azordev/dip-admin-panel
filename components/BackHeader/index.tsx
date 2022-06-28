/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import styles from './BackHeader.module.scss'

export interface BackHeaderProps {
  parent: string
  parentImageUrl?: string
}

const BackHeader: FC<BackHeaderProps> = ({ parent, parentImageUrl }) => (
  <nav className={styles.nav}>
    <button onClick={() => window.history.back()}>Regresar</button>
    {parentImageUrl ? (
      <img src={parentImageUrl} alt={parent} className={styles['back-header-image']} />
    ) : (
      <div>{parent}</div>
    )}
  </nav>
)

export default BackHeader
