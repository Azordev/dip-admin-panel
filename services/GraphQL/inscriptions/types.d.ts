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
