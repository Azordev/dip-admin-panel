import { useRouter } from 'next/router'

const DIDAdminPanel = () => {
  const { push } = useRouter()
  push('/eventos')
}

export default DIDAdminPanel
