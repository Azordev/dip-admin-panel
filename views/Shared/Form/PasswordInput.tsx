import React from 'react'

interface Props {
  placeholder?: string
  [key: string]: any
}

// About types here: https://www.carlrippon.com/react-forwardref-typescript/
const PasswordInput: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(({placeholder, ...rest}, ref) => (
  <input type="password" placeholder={placeholder} ref={ref} {...rest} />
))

export default PasswordInput
