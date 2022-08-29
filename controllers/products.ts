import { ApolloError } from '@apollo/client'
import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import client from '@/services/GraphQL/client'
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/services/GraphQL/products/mutations'
import { PRODUCTS } from '@/services/GraphQL/products/queries'
import { Product } from '@/services/GraphQL/products/types'

import { addObject } from '../services/AWS/s3'

interface GetParams {
  limit?: number
  offset?: number
  query?: string
}

export const getProducts = async (
  params?: GetParams,
): Promise<{ products: Product[] | undefined; error: ApolloError | undefined }> => {
  const { data, error } = await client.query<{ products: Product[] }>({
    query: PRODUCTS,
    variables: {
      offset: params?.offset || 0,
      limit: params?.limit || 24,
      query: params?.query || '%',
    },
  })

  return { products: data.products, error }
}

export const getProductsAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(500).json(err)
      }

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

      const file = files.image as formidable.File
      const { Location: imageUrl } = await addObject(file, 'products')

      await client.mutate({
        mutation: UPDATE_PRODUCT,
        variables: { ...fields, imageUrl, id: eventId },
      })
      res.json({
        msg: 'Product updated successfully',
        data: { ...fields, imageUrl },
      })
    } catch (error) {
      res.status(500).json(error)
    }
  })
}
