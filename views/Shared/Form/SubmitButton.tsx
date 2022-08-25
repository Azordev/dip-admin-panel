import React from 'react'

import Button from '../Button'

import styles from './Form.module.scss'

const SubmitButton = ({ isLoading = false, text = 'Submit', ...rest }) => (
  <Button type="submit" icon={isLoading ? 'spinner' : ''} className={`shadow-md ${styles.submit}`} {...rest}>
    {isLoading ? 'Cargando...' : text}
  </Button>
)

export default SubmitButton
