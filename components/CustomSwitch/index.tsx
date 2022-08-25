import { ChangeEvent, FC, useEffect, useState } from 'react'

import styles from './CustomSwitch.module.scss'

interface SwitchProperties {
  onChange: (_isChecked: boolean) => void
  isChecked: boolean
}

const Switch: FC<SwitchProperties> = ({ isChecked, onChange }) => {
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
    <div className={styles.switch}>
      <input type="checkbox" checked={isCheckedState} onChange={handleChange} />
    </div>
  )
}

export default Switch
