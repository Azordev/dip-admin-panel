import React from 'react'
import Button from '../Button'
import styles from './Form.module.scss'

const SubmitButton = ({ isLoading = false, text = 'Submit', ...rest }) => (
  <Button type="submit" icon={isLoading ? 'spinner' : 'checkmark'} className={`shadow-md ${styles.submit}`} {...rest}>
    {isLoading ? 'Loading...' : text}
  </Button>
)

export default SubmitButton
