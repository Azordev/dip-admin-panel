export const inscriptionInfo = `
  member_id
  event_id
`

export interface InscriptionEditable {
  member_id: string
  event_id: string
}

export interface Inscription {
  id: string
  attendee_member: {
    first_names: string
    last_names: string
    id: string
    email: string
  }
  event_information: {
    id: string
    date: string
    is_active: boolean
    title: string
    type: 'ATTENDANCE' | 'WORKSHOP'
  }
  updated_at: string
}

export interface MutableInscriptionFormProps {
  onSubmit: (_formData: InscriptionEditable) => void
  loading: boolean
}
