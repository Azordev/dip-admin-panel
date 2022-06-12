import client from '@/services/GraphQL/client'
import { INSERT_ERROR } from '@/services/GraphQL/errors/errors'

export const logError = (error: Error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  } else {
    client.mutate({
      mutation: INSERT_ERROR,
      variables: {
        error: JSON.stringify(error),
        origin: 'ADMIN',
        type: 'ERROR',
        codeLocation: '',
      },
    })
  }
}
