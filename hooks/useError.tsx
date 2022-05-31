import { useMutation } from '@apollo/client'
import { INSERT_ERROR } from '../services/GraphQL/mutations/errors'

const useError = () => {
  const [createError] = useMutation(INSERT_ERROR)

  return [createError]
}

export default useError
