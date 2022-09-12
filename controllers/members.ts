import { ApolloError } from '@apollo/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import client from '@/services/GraphQL/client'
import { TOGGLE_USER } from '@/services/GraphQL/users/mutations'
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

export const toggleMember = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const isActive = !(req.query['is-active'] === 'true' || false)
    await client.mutate({
      mutation: TOGGLE_USER,
      variables: { id, isActive },
    })
    res.status(200).json({ msg: 'Member toggled  successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
