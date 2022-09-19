import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'

import UpdateFormContainer from '@/components/UpdateForm'
import useLogger from '@/hooks/useLogger'
import { USER_BY_ID } from '@/services/GraphQL/users/queries'
import { UserEditable } from '@/services/GraphQL/users/types'
import EditMemberForm from '@/views/Users//Edit/EditMember'

const EditUserInformation: NextPage = () => {
  const { push, query } = useRouter()
  const [loading, setLoading] = useState(false)
  const { error: logError } = useLogger()

  const submitMemberHandler = async (user: UserEditable) => {
    setLoading(true)
    try {
      await axios.put(`/api/members/${query.id}`, user)
      setLoading(false)
      Swal.fire({
        title: 'Socio actualizado',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      push('/socios')
    } catch (error) {
      logError(error as Error, 'pages/socios/editar/[id].tsx', 'useQuery(USER_BY_ID)', 'UNEXPECTED')
    }
  }

  return (
    <UpdateFormContainer
      currentDataQuery={USER_BY_ID}
      submitHandler={submitMemberHandler}
      isSubmitLoading={loading}
      UpdateForm={EditMemberForm}
      queryName="user"
    />
  )
}

export default EditUserInformation
