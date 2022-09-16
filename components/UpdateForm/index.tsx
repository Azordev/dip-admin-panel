import { DocumentNode, useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import useLogger from '@/hooks/useLogger'

import { BackHeaderProps } from '../BackHeader'
import Loading from '../Loading'
import UpdateFormLayout from './Layout'

interface Props extends BackHeaderProps {
  submitHandler: (_dataForm: any) => void
  currentDataQuery: DocumentNode
  UpdateForm: FC<any>
  isSubmitLoading?: boolean
  commercialName?: string
  queryName: string
  parentImageUrl?: string
}

const UpdateFormContainer: FC<Props> = ({
  currentDataQuery,
  submitHandler,
  isSubmitLoading,
  UpdateForm,
  commercialName,
  queryName,
  parentImageUrl,
}) => {
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
        setCurrentData(originalData[queryName])
      }
    }

    if (query.id) getCurrentData(query.id as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loading className="center-text" />

  return (
    <UpdateFormLayout commercialName={commercialName} parentImageUrl={parentImageUrl}>
      <UpdateForm onSubmit={submitHandler} loading={isSubmitLoading} originalData={currentData} />
    </UpdateFormLayout>
  )
}

export default UpdateFormContainer
