import React from 'react'

import styles from './LogoDID.module.scss'

const LogoDID: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.68 81.55" className={className}>
    <g id="Capa_2" data-name="Capa 2">
      <g id="Capa_1-2" data-name="Capa 1">
        <text className={styles['cls-1']} transform="translate(0 78.34)">
          <tspan className={styles['cls-2']}>P</tspan>
          <tspan className={styles['cls-3']} x="15.81" y="0">
            E
          </tspan>
          <tspan className={styles['cls-4']} x="31.81" y="0">
            R
          </tspan>
          <tspan x="48.14" y="0">
            Ú
          </tspan>
        </text>
        <path d="M35.76,0C25.44,0,15.12,0,4.81,0H0V7.2H3.54c10.64,0,21.27.06,31.9,0,7,0,13.13,2.1,18,7,7.09,7.2,8.92,15.93,5.6,25.35C56,48.29,49.51,54.08,40.26,54.81c-10.77.85-21.65.38-32.48.48-.18,0-.36-.18-.7-.34V21.1H35.32a20.57,20.57,0,0,1,3.14.13A10.29,10.29,0,0,1,47,31.17c.25,4.42-2.75,9.28-7.28,9.75-6.18.65-12.48.16-19,.16v-4H13.87V48.68c7.85,0,15.42.06,23,0a17.58,17.58,0,0,0,17.37-17c.32-8.79-6.89-17.29-16-17.62C25.63,13.62,13,14,.1,14V62.58c1.22,0,2.15,0,3.09,0,11.79,0,23.61.47,35.36-.18A30.77,30.77,0,0,0,67.62,33.88C68.74,14.89,54.8.07,35.76,0" />
        <rect x="13.87" y="26.74" width="6.82" height="5.39" />
      </g>
    </g>
  </svg>
)

export default LogoDID
