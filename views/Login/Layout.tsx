import { NextPage } from 'next'

import { LoginFormProps } from '@/services/GraphQL/users/types'

import Centered from '../Shared/Layouts/Centered'
import LogoDID from '../SVGs/LogoDID/LogoDID'
import LoginForm from './LoginForm'

import styles from './Login.module.scss'

const LoginLayout: NextPage<LoginFormProps> = ({ onSubmit, loading }) => (
  <Centered>
    <div className={styles['login-container']}>
      <h1>AWS Test Preview New Domain</h1>
      <LogoDID className={styles.image} />
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </div>
  </Centered>
)

export default LoginLayout
