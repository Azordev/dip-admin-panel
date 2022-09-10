import React from 'react'

import styles from './Eventos.module.scss'

const Eventos: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 124.813 124.813"
    className={`${styles.icon}${className ? '' + className : ''}`}
  >
    <g>
      <g>
        <path
          d="M48.083,80.355l-1.915,11.374c-0.261,1.555,0.377,3.122,1.65,4.05c1.275,0.926,2.968,1.05,4.361,0.32l10.226-5.338
			L72.631,96.1c0.605,0.314,1.268,0.472,1.924,0.472c0.859,0,1.716-0.269,2.439-0.792c1.274-0.928,1.914-2.495,1.651-4.05
			l-1.913-11.374l8.234-8.077c1.126-1.103,1.527-2.749,1.044-4.247c-0.485-1.497-1.783-2.593-3.341-2.823l-11.41-1.692
			l-5.139-10.329c-0.697-1.41-2.141-2.303-3.716-2.303c-1.572,0-3.015,0.893-3.718,2.303l-5.134,10.329l-11.41,1.691
			c-1.561,0.23-2.853,1.326-3.339,2.823c-0.486,1.498-0.086,3.146,1.042,4.247L48.083,80.355z"
        />
        <path
          d="M111.443,13.269H98.378V6.022C98.378,2.696,95.682,0,92.355,0H91.4c-3.326,0-6.021,2.696-6.021,6.022v7.247H39.282V6.022
			C39.282,2.696,36.586,0,33.261,0h-0.956c-3.326,0-6.021,2.696-6.021,6.022v7.247H13.371c-6.833,0-12.394,5.559-12.394,12.394
			v86.757c0,6.831,5.561,12.394,12.394,12.394h98.073c6.832,0,12.394-5.562,12.394-12.394V25.663
			C123.837,18.828,118.275,13.269,111.443,13.269z M109.826,110.803H14.988V43.268h94.838V110.803z"
        />
      </g>
    </g>
  </svg>
)

export default Eventos
