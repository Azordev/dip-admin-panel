import React from 'react'

import styles from './Form.module.scss'

interface Props {
  placeholder?: string
}

// About types here: https://www.carlrippon.com/react-forwardref-typescript/
const PasswordInput: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { placeholder, ...rest },
  ref,
) {
  return (
    <input
      type="password"
      required
      placeholder={placeholder}
      ref={ref}
      className={`shadow ${styles.input}`}
      {...rest}
    />
  )
})

export default PasswordInput
