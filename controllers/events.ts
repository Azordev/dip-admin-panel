import { ApolloError } from '@apollo/client'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_EVENT, DEACTIVATE_EVENT, UPDATE_EVENT } from '@/services/GraphQL/events/mutations'
import { EVENT_BY_ID, EVENTS } from '@/services/GraphQL/events/queries'
import { Event } from '@/services/GraphQL/events/types'

interface GetParams {
  limit?: number
  offset?: number
  query?: string
}

export const getEvents = async (
  params?: GetParams,
): Promise<{ events: Event[] | undefined; error: ApolloError | undefined }> => {
  const { data, error } = await client.query<{ events: Event[] }>({
    query: EVENTS,
    variables: {
      offset: params?.offset || 0,
      limit: params?.limit || 24,
      query: params?.query || '%',
    },
  })

  return { events: data.events, error }
}

export const getEventsAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req
    const { data, error } = await client.query({
      query: EVENTS,
      variables: {
        offset: Number(query?.offset) || 0,
        limit: Number(query?.limit) || 24,
        query: query?.query || '%',
      },
    })

    if (error?.message) {
      return res.status(500).json({ error: error.message })
    }

    return res.json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getEvent = async (
  eventId: string | string[],
): Promise<{ event: Event | undefined; error: ApolloError | undefined }> => {
  const { data, error } = await client.query<{ event: Event }>({
    query: EVENT_BY_ID,
    variables: {
      id: eventId,
    },
  })

  return { event: data.event, error }
}

export const getEventAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
        return res.status(500).json({ error: err, fields, files })
      }

      if (files.image) {
        const file = files.image as formidable.File
        const { Location: imageUrl, error: saveError } = await addObject(file, 'events')

        if (saveError) {
          return res.status(500).json({ error: saveError, fields, files })
        }

        const { errors } = await client.mutate({
          mutation: CREATE_EVENT,
          variables: { ...fields, imageUrl: imageUrl || '' },
        })

        if (errors) {
          return res.status(500).json({ errors })
        }

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
      res.status(500).json({ error, fields, files })
    }
  })
}

export const updateEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    try {
      const eventId = req.query?.id
      const eventDataBase = await getEvent(eventId)
      const { event: eventDefault, error: errEventDataBase } = eventDataBase ?? {}

      if (err || errEventDataBase) {
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
        return res.status(204).json({
          msg: 'Event updated successfully',
          data: { ...fields, imageUrl },
        })
      }

      await client.mutate({
        mutation: UPDATE_EVENT,
        variables: { ...fields, imageUrl: eventDefault?.imageUrl ?? '', id: eventId },
      })
      return res.status(204).json({
        msg: 'Event updated successfully',
        data: { ...fields },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}

export const deleteEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ msg: 'EventId is required' })
  }

  try {
    await client.mutate({
      mutation: DEACTIVATE_EVENT,
      variables: { id },
    })
    return res.status(204).json({ msg: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}
