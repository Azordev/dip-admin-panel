import { DocumentNode, useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import useLogger from '@/hooks/useLogger'

import Loading from '../Loading'
import UpdateFormLayout from './Layout'

interface Props {
  submitHandler: (_dataForm: any) => void
  currentDataQuery: DocumentNode
  UpdateForm: FC<any>
  isSubmitLoading?: boolean
}

const UpdateFormContainer: FC<Props> = ({ currentDataQuery, submitHandler, isSubmitLoading, UpdateForm }) => {
  const [queryOriginalData, { loading }] = useLazyQuery(currentDataQuery)
  const { query } = useRouter()
  const { error: logError } = useLogger()
  const [currentData, setCurrentData] = useState()

  useEffect(() => {
    const getCurrentData = async (id: string) => {
      const {
        called,
        data: originalData,
        error: queryError,
      } = await queryOriginalData({
        variables: {
          id,
        },
      })

      if (queryError) {
        logError(queryError, 'components/UpdateForm', 'Error al obtener la información', 'API_ORIGIN')
        return
      }

      if (called && originalData) {
        const { event } = originalData
        setCurrentData(event)
      }
    }

    if (query.id) getCurrentData(query.id as string)
  }, [currentDataQuery, currentData, query, queryOriginalData, logError])

  if (loading) return <Loading />

  return (
    <UpdateFormLayout>
      <UpdateForm onSubmit={submitHandler} loading={isSubmitLoading} originalData={currentData} />
    </UpdateFormLayout>
  )
}

export default UpdateFormContainer
