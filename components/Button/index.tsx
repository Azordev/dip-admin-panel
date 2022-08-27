import { FC, ReactNode } from 'react'

import styles from './Button.module.css'
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  withIcon?: boolean
  iconSize?: number
  iconName?: string
  iconType?: string
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  withIcon = false,
  iconSize,
  iconName,
  iconType = 'ios-filled',
  type = 'button',
}) => {
  const srcIcon = `https://img.icons8.com/${iconType}/${iconSize}/${iconName}`
  return (
    <button type={type} className={`${className} ${styles.button}`} onClick={onClick}>
      {withIcon && <img src={srcIcon} alt={iconName} />}
      <p>{children}</p>
    </button>
  )
}

export default Button
