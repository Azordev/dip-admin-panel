import { NextPage } from 'next'
import { LoginInput } from '@/services/GraphQL/types/users'
import Centered from '../Shared/Layouts/Centered'
import LogoDID from '../SVGs/LogoDID/LogoDID'
import styles from './Login.module.scss'
import LoginForm from './LoginForm'

interface LoginFormProps {
  onSubmit: (_formData: LoginInput) => void
  loading: boolean
}
const LoginLayout: NextPage<LoginFormProps> = ({ onSubmit, loading }) => (
  <Centered>
    <div className={`shadow-md ${styles['login-container']}`}>
      <LogoDID className={styles.image} />
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </div>
  </Centered>
)

export default LoginLayout
