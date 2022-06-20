import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { CREATE_USER_MEMBER } from '@/services/GraphQL/users/mutations'
import { UserEditable } from '@/services/GraphQL/users/types'
import CreateUserForm from '@/views/Users/Create'

const Create: NextPage = () => {
  const { push } = useRouter()
  const { error } = useLogger()

  const [createUser, { loading, error: mutationError }] = useMutation(CREATE_USER_MEMBER)

  const submitHandler = async (newUser: UserEditable) => {
    createUser({ variables: { ...newUser } })
    push('/usuarios')
  }

  if (mutationError) error(Error(mutationError.message), 'pages/usuarios/crear.tsx', 'Error al crear el usuario')

  return (
    <div className="container">
      <h1 className="title">Create User</h1>

      <CreateUserForm onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
