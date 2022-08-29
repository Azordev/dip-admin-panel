import { ApolloError } from '@apollo/client'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { PROVIDERS } from '@/services/GraphQL/providers/queries'
import { Provider } from '@/services/GraphQL/providers/types'

interface GetParams {
  limit?: number
  offset?: number
  query?: string
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
        data: { ...fields, logoUrl },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}
