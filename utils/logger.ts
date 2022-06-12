import client from '@/services/GraphQL/client'
import { CREATE_ERROR } from '@/services/GraphQL/errors/mutations'

export const logError = (error: Error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  } else {
    client.mutate({
      mutation: CREATE_ERROR,
      variables: {
        error: JSON.stringify(error),
        origin: 'ADMIN',
        type: 'ERROR',
        codeLocation: '',
      },
    })
  }
}
