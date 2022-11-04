import { NextApiRequest, NextApiResponse } from 'next'

import client from '@/services/GraphQL/client'
import { CREATE_SUBSCRIPTION } from '@/services/GraphQL/subscriptions/mutations'

export const createSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req
    const { data, errors: userErrors } = await client.mutate({
      mutation: CREATE_SUBSCRIPTION,
      variables: {
        memberId: body.memberId,
        expiration: body.expiration,
      },
    })

    if (userErrors) {
      return res.status(500).json(userErrors)
    }

    return res.json({
      msg: 'Subscription created successfully',
      data: { ...data },
    })
  } catch (error) {
    res.status(500).json(error)
  }
}
