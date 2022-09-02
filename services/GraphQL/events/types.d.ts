import { gql } from '@apollo/client'
import React from 'react'

export const eventInfo = gql`
  fragment EventInfoFragment on events {
    id
    title
    date
    type
    isActive: is_active
    requirementsUrl: requirements_url
    imageUrl: image_url
    description
    createdAt: created_at
    updatedAt: updated_at
    inscriptions: inscriptions_aggregate {
      stats: aggregate {
        count
      }
    }
  }
`

export interface EventBase {
  title: string
  date: string
  type: 'ATTENDANCE' | 'WORKSHOP'
  description?: string
}

export interface EventEditable extends EventBase {
  title?: string
  type?: string
  imageUrl?: string
  requirementsUrl?: string
}

export interface Event extends EventEditable {
  id: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  inscriptions: {
    stats: {
      count: number
    }
  }
}

export interface MutableEventFormProps {
  onSubmit: (_e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  originalData?: Event
}
