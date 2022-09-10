import { gql } from '@apollo/client'

import { Event } from '../events/types.d'

export const inscriptionInfo = gql`
  fragment InscriptionInfoFragment on inscription {
    memberId: member_id
    eventId: event_id
  }
`

export interface InscriptionEditable {
  memberId: string
  eventId: string
}

export interface Inscription {
  id: string
  member: {
    firstNames: string
    lastNames: string
    id: string
    email: string
    user: {
      isActive: boolean
      memberCode: string
      createdAt: string
    }
  }
  event: Event
  updatedAt: string
}

export interface Attendee {
  id: string
  member: {
    id: string
    email: string
    firstNames: string
    lastNames: string
    user: {
      isActive: boolean
      memberCode: string
      createdAt: string
    }
  }
  updatedAt: string
}

export interface MutableInscriptionFormProps {
  onSubmit: (_formData: InscriptionEditable) => void
  loading: boolean
}
