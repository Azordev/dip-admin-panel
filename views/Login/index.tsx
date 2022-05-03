import React from 'react'
import Centered from '../Shared/Layouts/Centered'
import LogoDID from '../SVGs/LogoDID/LogoDID'
import styles from './Login.module.scss'
import LoginForm from './LoginForm'

const Login = () => (
  <Centered>
    <div className={`shadow-md ${styles['login-container']}`}>
      <LogoDID className={styles.image} />
      <LoginForm />
    </div>
  </Centered>
)

export default Login
