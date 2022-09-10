import { ApolloError } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'

import client from '@/services/GraphQL/client'
import { DELETE_INSCRIPTION } from '@/services/GraphQL/inscriptions/mutations'
import { ATTENDEES } from '@/services/GraphQL/inscriptions/queries'
import { Attendee } from '@/services/GraphQL/inscriptions/types'

export const getInscriptionsByEvent = async (
  eventId: string,
): Promise<{ attendees: Attendee[] | undefined; error: ApolloError | undefined }> => {
  const { data, error } = await client.query<{ inscriptions: Attendee[] }>({
    query: ATTENDEES,
    variables: { eventId },
  })
  return { attendees: data?.inscriptions || [], error }
}

export const deleteInscription = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ msg: 'inscriptionId is required' })
  }

  try {
    await client.mutate({
      mutation: DELETE_INSCRIPTION,
      variables: { id },
    })
    return res.status(204)
  } catch (error) {
    return res.status(500).json(error)
  }
}
