import React from 'react'

import styles from './Centered.module.scss'

const Centered: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div className={styles.container}>{children}</div>
)

export default Centered
