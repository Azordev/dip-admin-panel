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
    const filesUrl: { [key: string]: any } = {}
    try {
      if (err) {
        return res.status(500).json(err)
      }

      for (const key in files) {
        if (Object.prototype.hasOwnProperty.call(files, key)) {
          const file = files[key] as formidable.File
          const { Location: url, error: awsError } = await addObject(file, 'events')

          if (awsError) {
            return res.status(500).json({ error: awsError, fields, files })
          }

          if (url) {
            filesUrl[key] = url
          }
        }
      }

      const variables = { ...fields, ...filesUrl }
      await client.mutate({
        mutation: CREATE_EVENT,
        variables,
      })
      return res.json({
        msg: 'Event created successfully',
        variables,
      })
    } catch (error) {
      res.status(500).json({ error, fields, files })
    }
  })
}

export const updateEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    const filesUrl: { [key: string]: any } = {}
    const eventId = req.query?.id
    try {
      if (err) {
        return res.status(500).json(err)
      }

      if (!eventId) {
        return res.status(400).json({ msg: 'EventId is required' })
      }

      for (const key in files) {
        if (Object.prototype.hasOwnProperty.call(files, key)) {
          const file = files[key] as formidable.File
          const { Location: url, error: awsError } = await addObject(file, 'events')

          if (awsError) {
            return res.status(500).json({ error: awsError, fields, files })
          }

          if (url) {
            filesUrl[key] = url
          }
        }
      }

      await client.mutate({
        mutation: UPDATE_EVENT,
        variables: { ...fields, ...filesUrl, id: eventId },
      })
      return res.status(204).json({
        msg: 'Event updated successfully',
        variables: { ...fields, ...filesUrl },
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
