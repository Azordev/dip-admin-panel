import React from 'react'
import Icons8 from '../Icons8'

interface Props {
  icon?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: 'submit' | 'reset' | 'button'
  iconAtEnd?: boolean
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ icon, onClick, className = '', iconAtEnd = false, type, children, ...rest }) => (
  <button
    type={type}
    onClick={onClick}
    className={`${className ? className + ' ' : ''}`}
    {...rest}
  >
    {icon && <Icons8 name={icon} color="color" />}
    {children}
  </button>
)

export default Button
