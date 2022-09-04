import { ChangeEvent, FC, useEffect, useState } from 'react'

import styles from './CustomSwitch.module.scss'

interface SwitchProperties {
  onChange: (_isChecked: boolean) => void
  isChecked: boolean
  firstLabel?: string
  secondLabel?: string
  size?: 'sm' | 'xl' // default: sm
}

const Switch: FC<SwitchProperties> = ({ isChecked, onChange, firstLabel, secondLabel, size = 'sm' }) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setIsCheckedState(isChecked)
    onChange(isChecked)
  }

  useEffect(() => {
    setIsCheckedState(isChecked)
  }, [isChecked])

  return (
    <div className={styles['switch-container']}>
      {firstLabel && <label className={styles['switch-label']}>{firstLabel}</label>}
      <div className={styles[`switch-${size}`]}>
        <input type="checkbox" checked={isCheckedState} onChange={handleChange} />
      </div>
      {secondLabel && <label className={styles['switch-label']}>{secondLabel}</label>}
    </div>
  )
}

export default Switch
