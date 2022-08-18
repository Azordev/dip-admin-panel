import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import client from '@/services/GraphQL/client'
import { CREATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { PRODUCTS } from '@/services/GraphQL/products/queries'

import { addObject } from '../services/AWS/s3'

export const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req
    const { data } = await client.query({
      query: PRODUCTS,
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

export const createProduct = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (_err, fields, files) => {
    const file = files.image as formidable.File
    const { Location: imageUrl } = await addObject(file, 'products')

    await client.mutate({
      mutation: CREATE_PRODUCT,
      variables: { ...fields, imageUrl },
    })
    res.json({
      msg: 'Product created successfully',
      data: { ...fields, imageUrl },
    })
  })
}
