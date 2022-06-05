import { useMutation } from '@apollo/client'
import { INSERT_ERROR } from '../services/GraphQL/mutations/errors'

const useError = () => {
  const [createError] = useMutation(INSERT_ERROR)

  const logError = (
    error: Error,
    codeLocation: string,
    type: 'INPUT' | 'AUTHORIZATION' | 'AVAILABILITY' | 'UNEXPECTED' | 'OTHER' = 'OTHER',
  ): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(codeLocation, error)
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
  }

  return [logError]
}

export default useError
