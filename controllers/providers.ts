import { ApolloError } from '@apollo/client'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_PROVIDER, DEACTIVATE_PROVIDER, UPDATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { PROVIDER_BY_ID, PROVIDERS } from '@/services/GraphQL/providers/queries'
import { Provider, ProviderEditable } from '@/services/GraphQL/providers/types'

interface GetParams {
  limit?: number
  offset?: number
  query?: string
}

export const getProvider = async (id: string) => {
  const { data, error } = await client.query<{ provider: ProviderEditable }>({
    query: PROVIDER_BY_ID,
    variables: {
      id,
    },
  })

  return { provider: data.provider, error }
}

export const getProviders = async (
  params?: GetParams,
): Promise<{ providers: Provider[] | undefined; error: ApolloError | undefined }> => {
  const { data, error } = await client.query<{ providers: Provider[] }>({
    query: PROVIDERS,
    variables: {
      offset: params?.offset || 0,
      limit: params?.limit || 24,
      query: params?.query || '%',
    },
  })

  return { providers: data.providers, error }
}

export const getProvidersAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req
    const { data } = await client.query({
      query: PROVIDERS,
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

export const createProvider = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(500).json(err)
      }

      const file = files.logo as formidable.File
      const { Location: logoUrl } = await addObject(file, 'providers')

      await client.mutate({
        mutation: CREATE_PROVIDER,
        variables: { ...fields, logoUrl },
      })
      res.json({
        msg: 'Provider created successfully',
        data: {
          ...fields,
          logoUrl: logoUrl || '',
        },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}

export const updateProvider = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (err, fields, files) => {
    try {
      const { id } = req.query
      if (err) {
        return res.status(500).json(err)
      }

      if (files.logo) {
        const file = files.logo as formidable.File
        const { Location: logoUrl } = await addObject(file, 'providers')

        await client.mutate({
          mutation: UPDATE_PROVIDER,
          variables: { ...fields, logoUrl, id },
        })
        return res.status(204).json({
          msg: 'Event updated successfully',
          data: { ...fields, logoUrl },
        })
      }

      await client.mutate({
        mutation: UPDATE_PROVIDER,
        variables: { ...fields, logoUrl: '' },
      })
      res.status(204).json({
        msg: 'Provider updated successfully',
        data: { ...fields },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}

export const disableProvider = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    await client.mutate({
      mutation: DEACTIVATE_PROVIDER,
      variables: { id },
    })
    res.status(204).json({ msg: 'Provider disabled successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}
