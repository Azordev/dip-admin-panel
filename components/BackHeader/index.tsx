/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import styles from './BackHeader.module.scss'

export interface BackHeaderProps {
  parent: string
  parentImageUrl?: string
}

const BackHeader: FC<BackHeaderProps> = ({ parent, parentImageUrl }) => (
  <div>
    <nav className={styles.nav}>
      <div className={styles.containerBTNLOGO} onClick={() => window.history.back()}>
        <img
          className={styles.logo}
          src="https://icons.veryicon.com/png/o/application/yitao-wireless-icon-library/back-23.png"
          alt=""
        />
        <button className={styles.button}>Regresar</button>
      </div>
      {parentImageUrl ? (
        <img src={parentImageUrl} alt={parent} className={styles['back-header-image']} />
      ) : (
        <div>{parent}</div>
      )}
    </nav>
  </div>
)

export default BackHeader
