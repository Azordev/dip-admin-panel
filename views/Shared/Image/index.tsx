import Img from 'next/image'
import React from 'react'

import styles from './Image.module.scss'

interface Props {
  src: string
  alt: string
  [key: string]: string
}

interface Loader {
  src: string
  width: number
  quality?: number
}

const loader = ({ src, width, quality }: Loader) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const Image: React.FC<Props> = ({ src, alt, className, imgClassName, ...rest }) => (
  <div className={`${styles.container}${className ? ` ${className}` : ''}`}>
    <Img src={src} alt={alt} layout="fill" className={imgClassName} loader={loader} {...rest} />
  </div>
)

export default Image
