import React from 'react'
// eslint-disable-next-line import/no-named-default
import { default as Img } from 'next/image'
import styles from './Image.module.scss'

interface Props {
  src: string
  alt: string
  [key: string]: string
}

const Image: React.FC<Props> = ({ src, alt, className, imgClassName, ...rest }) => (
  <div className={`${styles.container}${className ? ' ' + className : ''}`}>
    <Img src={src} alt={alt} layout="fill" {...rest} className={imgClassName} />
  </div>
)

export default Image
