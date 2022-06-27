import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyItem from '@/components/EmptyItem'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { USER_BY_ID } from '@/services/GraphQL/users/queries'
import ClientOnly from '@/views/Shared/ClientOnly'
import UserDetail from '@/views/Users/Detail'

const User: NextPage = () => {
  const { push, query } = useRouter()
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(USER_BY_ID, {
    variables: { id: query.id },
  })
  const { error: logError } = useLogger()

  if (queryError) {
    logError(queryError, 'pages/categorias/[id].tsx Category.tsx', 'useQuery(CATEGORY_BY_ID)', 'UNEXPECTED')
    push('/usuarios')
  }

  if (loading) return <Loading />
  if (!data || !data.user) return <EmptyItem text="La categoría esta vacía o es invalida" />

  return (
    <ClientOnly>
      <UserDetail user={data.user} />
    </ClientOnly>
  )
}

export default User
