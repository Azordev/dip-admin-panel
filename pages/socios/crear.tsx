import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Swal from 'sweetalert2'

import BackHeader from '@/components/BackHeader'
import useLogger from '@/hooks/useLogger'
import { UserEditable } from '@/services/GraphQL/users/types'
import CreateUserLayout from '@/views/Users/Create'

const Create: NextPage = () => {
  const { push } = useRouter()
  const { error: logError } = useLogger()
  const [loading, setLoading] = useState(false)

  const submitHandler = async (newUser: UserEditable) => {
    setLoading(true)
    try {
      const member: typeof newUser = {
        ...newUser,
        position: 'Socio',
        type: 'MEMBER',
      }
      const { data } = await axios.post('/api/members', member)
      const { data: memberData } = data
      if (!memberData) {
        throw new Error('Incomplete member data')
      }
      const { startDate, memberId } = memberData
      const parseStartDate = new Date(startDate)
      const expiration = new Date(parseStartDate.setFullYear(parseStartDate.getFullYear() + 1))
      const subscriptionData = {
        expiration: expiration.toLocaleDateString(),
        memberId,
      }
      await axios.post('/api/subscriptions', subscriptionData).catch(error => {
        throw new Error(error.message)
      })
      setLoading(false)
      Swal.fire({
        title: 'Socio creado',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      push('/socios')
    } catch (error) {
      logError(error as Error, 'pages/proveedores/crear.tsx', 'Error al crear el proveedor')
      setLoading(false)
    }
  }

  return (
    <div>
      <BackHeader to="/socios" />
      <CreateUserLayout onSubmit={submitHandler} loading={loading} />
    </div>
  )
}

export default Create
