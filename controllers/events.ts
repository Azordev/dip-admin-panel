import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_EVENT, UPDATE_EVENT } from '@/services/GraphQL/events/mutations'
import { EVENT_BY_ID, EVENTS } from '@/services/GraphQL/events/queries'

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

export const getEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req
    const { data } = await client.query({
      query: EVENT_BY_ID,
      variables: {
        id: query.id,
      },
    })

    res.json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createEvent = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(500).json(err)
      }

      if (files.image) {
        const file = files.image as formidable.File
        const { Location: imageUrl } = await addObject(file, 'events')

        await client.mutate({
          mutation: CREATE_EVENT,
          variables: { ...fields, imageUrl },
        })
        return res.json({
          msg: 'Event created successfully',
          data: { ...fields, imageUrl },
        })
      }

      await client.mutate({
        mutation: CREATE_EVENT,
        variables: { ...fields, imageUrl: '' },
      })
      return res.json({
        msg: 'Event created successfully',
        data: { ...fields },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}

export const updateEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    try {
      const eventId = req.query?.id

      if (err) {
        return res.status(500).json(err)
      }

      if (!eventId) {
        return res.status(400).json({ msg: 'EventId is required' })
      }

      if (files.image) {
        const file = files.image as formidable.File
        const { Location: imageUrl } = await addObject(file, 'events')

        await client.mutate({
          mutation: UPDATE_EVENT,
          variables: { ...fields, imageUrl, id: eventId },
        })
        return res.json({
          msg: 'Event updated successfully',
          data: { ...fields, imageUrl },
        })
      }

      await client.mutate({
        mutation: UPDATE_EVENT,
        variables: { ...fields, imageUrl: '', id: eventId },
      })
      return res.json({
        msg: 'Event updated successfully',
        data: { ...fields },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}
