import { useMutation } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import BackHeader from '@/components/BackHeader'
import useLogger from '@/hooks/useLogger'
import { CREATE_USER_MEMBER } from '@/services/GraphQL/users/mutations'
import { UserEditable } from '@/services/GraphQL/users/types'
import CreateUserLayout from '@/views/Users/Create'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [createUser, { loading, error: mutationError }] = useMutation(CREATE_USER_MEMBER)
  const { error: logError } = useLogger()

  const submitHandler = async (newUser: UserEditable) => {
    createUser({ variables: { ...newUser } })
    push('/socios')
  }

  if (mutationError) logError(mutationError, 'pages/socios/crear.tsx', 'Error al crear el usuario')

  return (
    <div>
      <BackHeader />
      <CreateUserLayout onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
