import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

import { CREATE_ERROR } from '@/services/GraphQL/errors/mutations'

const useLogger = () => {
  const [createError] = useMutation(CREATE_ERROR)
  toast.dismiss()

  const error = (
    error: Error,
    codeLocation: string,
    message: string = 'Encontramos un error, ha sido reportado al administrador. Por favor intente más tarde.',
    type: 'CLIENT_CODE' | 'SERVER_CONNECTION' | 'API_ORIGIN' | 'UNEXPECTED' | 'OTHER' = 'OTHER',
  ): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(JSON.stringify({ codeLocation, error, type }, null, 4))
    } else {
      createError({
        variables: {
          error: JSON.stringify(error),
          origin: 'ADMIN',
          type,
          codeLocation,
        },
      })
    }
    toast.error(message)
  }

  const warn = (
    codeLocation: string,
    message: string,
    type: 'INPUT' | 'AUTHORIZATION' | 'AVAILABILITY' | 'OTHER' = 'OTHER',
  ): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(JSON.stringify({ codeLocation, message, type }, null, 4))
    }
    toast.warn(message, { theme: 'colored' })
  }

  const log = (
    codeLocation: string,
    message: string,
    type: 'SUCCESS' | 'EVENT' | 'DEBUG' | 'INFORMATIVE' | 'OTHER' = 'OTHER',
  ): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(JSON.stringify({ codeLocation, message, type }, null, 4))
      if (type === 'DEBUG') {
        console.trace()
        debugger
      }
    }
    if (type === 'SUCCESS') toast.success(message, { theme: 'colored' })
    else if (type === 'INFORMATIVE') toast.info(message, { theme: 'colored' })
    else toast(message)
  }

  return { log, warn, error }
}

export default useLogger
