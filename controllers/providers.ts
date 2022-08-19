import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '@/services/AWS/s3'
import client from '@/services/GraphQL/client'
import { CREATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { PROVIDERS } from '@/services/GraphQL/providers/queries'

export const getProviders = async (req: NextApiRequest, res: NextApiResponse) => {
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
