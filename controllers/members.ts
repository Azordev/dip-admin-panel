import { ApolloError } from '@apollo/client'

import client from '@/services/GraphQL/client'
import { MEMBER_USERS } from '@/services/GraphQL/users/queries'
import { User } from '@/services/GraphQL/users/types'

interface GetParams {
  limit?: number
  offset?: number
  query?: string
}

export const getMembers = async (
  params?: GetParams,
): Promise<{ users: User[] | undefined; error: ApolloError | undefined }> => {
  const { data, error } = await client.query<{ users: User[] }>({
    query: MEMBER_USERS,
    variables: {
      offset: params?.offset || 0,
      limit: params?.limit || 24,
      query: params?.query || '%',
    },
  })

  return { users: data.users, error }
}
