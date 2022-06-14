import { FC, ElementType, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, DocumentNode } from '@apollo/client'
import { toast } from 'react-toastify'
import UpdateFormLayout from './Layout'

interface Props {
  submitHandler: (_dataForm: any) => void
  currentDataQuery: DocumentNode
  UpdateForm: ElementType
  isSubmitLoading?: boolean
}

const UpdateFormContainer: FC<Props> = ({ currentDataQuery, submitHandler, isSubmitLoading, UpdateForm }) => {
  const [queryOriginalData, { loading }] = useLazyQuery(currentDataQuery)
  const { query } = useRouter()
  const [currentData, setCurrentData] = useState()

  useEffect(() => {
    const getCurrentData = async (id: string) => {
      const {
        called,
        error,
        data: originalData,
      } = await queryOriginalData({
        variables: {
          id,
        },
      })

      if (error) {
        console.error(error)
        return toast('Error al obtener la información', { type: 'error' })
      }

      if (called && originalData) {
        const { event } = originalData
        setCurrentData(event)
      }
    }

    if (query.id) getCurrentData(query.id as string)
  }, [currentDataQuery, currentData, query, queryOriginalData])

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <UpdateFormLayout>
          <UpdateForm onSubmit={submitHandler} loading={isSubmitLoading} originalData={currentData} />
        </UpdateFormLayout>
      )}
    </>
  )
}

export default UpdateFormContainer
