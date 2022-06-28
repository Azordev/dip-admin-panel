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
    first_names: string
    last_names: string
    id: string
    email: string
  }
  event: Event
  updatedAt: string
}

export interface MutableInscriptionFormProps {
  onSubmit: (_formData: InscriptionEditable) => void
  loading: boolean
}
