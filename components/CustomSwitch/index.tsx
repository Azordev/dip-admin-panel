import { Path, UseFormRegister } from 'react-hook-form'

import styles from './CustomSwitch.module.scss'

interface SwitchProperties<T> {
  register?: UseFormRegister<T>
  onChange: (_isChecked: boolean) => void
  name: Path<T>
  isChecked: boolean
  firstLabel?: string
  secondLabel?: string
  required?: boolean
  size?: 'sm' | 'xl' // default: sm
}

const Switch = <T,>({
  register,
  onChange,
  name,
  isChecked,
  firstLabel,
  secondLabel,
  required = false,
  size = 'sm',
}: SwitchProperties<T>): JSX.Element => {
  return (
    <div className={styles['switch-container']}>
      {firstLabel && <label className={styles['switch-label']}>{firstLabel}</label>}
      <div className={styles[`switch-${size}`]}>
        <input
          type="checkbox"
          {...(register && register(name, { required }))}
          checked={isChecked}
          onChange={() => onChange(!isChecked)}
        />
      </div>
      {secondLabel && <label className={styles['switch-label']}>{secondLabel}</label>}
    </div>
  )
}

export default Switch
