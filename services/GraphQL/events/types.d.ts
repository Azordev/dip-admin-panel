export const eventInfo = `
  id
  title
  date
  type
  is_active
  requirements_url
  invitation_url
  image_url
  details
  description
  contact_information
  ad_url
  created_at
  updated_at
  inscriptions: inscriptions_aggregate {
    stats: aggregate {
      count
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
  image_url?: string
  requirements_url?: string
  image_url?: string
  ad_url?: string
  details?: string
  contact_information?: string
}

export interface Event extends EventEditable {
  id: string
  is_active: boolean
  created_at: string
  updated_at: string
  inscriptions: {
    stats: {
      count: number
    }
  }
}
