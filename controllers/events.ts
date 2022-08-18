import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_EVENT } from '@/services/GraphQL/events/mutations'
import { EVENTS } from '@/services/GraphQL/events/queries'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getEvents = async (_: NextApiRequest, res: NextApiResponse) => {
  const { data } = await client.query({
    query: EVENTS,
  })

  res.json(data)
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
