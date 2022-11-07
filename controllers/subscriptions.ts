import { NextApiRequest, NextApiResponse } from 'next'

import client from '@/services/GraphQL/client'
import { CREATE_SUBSCRIPTION } from '@/services/GraphQL/subscriptions/mutations'

export const createSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body } = req
    if (!body.memberId) {
      return res.status(500).json({
        msg: 'Error getting member id',
      })
    }
    const { data, errors } = await client.mutate({
      mutation: CREATE_SUBSCRIPTION,
      variables: {
        memberId: body.memberId,
        expiration: body.expiration,
      },
    })

    if (errors) {
      return res.status(500).json({
        msg: 'Error while communicating with Data Base',
        errors,
      })
    }

    return res.json({
      msg: 'Subscription created successfully',
      data,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}
