import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_EVENT } from '@/services/GraphQL/events/mutations'
import { EVENTS } from '@/services/GraphQL/events/queries'

export const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req
    const { data } = await client.query({
      query: EVENTS,
      variables: {
        offset: Number(query?.offset) || 0,
        limit: Number(query?.limit) || 24,
        query: query?.query || '%',
      },
    })

    res.json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createEvent = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (_err, fields, files) => {
    const file = files.image as formidable.File
    const { Location: imageUrl } = await addObject(file, 'events')

    await client.mutate({
      mutation: CREATE_EVENT,
      variables: { ...fields, imageUrl },
    })
    res.json({
      msg: 'Event created successfully',
      data: { ...fields, imageUrl },
    })
  })
}
