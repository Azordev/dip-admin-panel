import { ChangeEvent, FC, useEffect, useState } from 'react'

import styles from './CustomSwitch.module.scss'

interface SwitchProperties {
  onChange: (_isChecked: boolean) => void
  isChecked: boolean
  firstLabel?: string
  secondLabel?: string
}

const Switch: FC<SwitchProperties> = ({ isChecked, onChange, firstLabel, secondLabel }) => {
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
    <div className={styles.switchContainer}>
      {firstLabel && <label className={styles.switchLabel}>{firstLabel}</label>}
      <div className={styles.switch}>
        <input type="checkbox" checked={isCheckedState} onChange={handleChange} />
      </div>
      {secondLabel && <label className={styles.switchLabel}>{secondLabel}</label>}
    </div>
  )
}

export default Switch
