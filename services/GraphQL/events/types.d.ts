import { gql } from '@apollo/client'

export const eventInfo = gql`
  fragment EventInfoFragment on events {
    id
    title
    date
    type
    isActive: is_active
    requirementsUrl: requirements_url
    invitationUrl: invitation_url
    imageUrl: image_url
    details
    description
    contactInformation: contact_information
    adUrl: ad_url
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
  imageUrl?: string
  adUrl?: string
  details?: string
  contactInformation?: string
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
  onSubmit: (_formData: EventEditable) => void
  loading: boolean
  originalData?: Event
}
