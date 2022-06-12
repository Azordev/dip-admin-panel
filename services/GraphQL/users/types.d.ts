export const memberInfo = `
  id
  contact_information
  private_information
  email
  address
  first_names
  last_names
`

export interface Member {
  id: string
  first_names: string
  last_names?: string
  email: string
  phone?: string
  address?: string
  created_at?: string
  updated_at?: string
  events_inscribed?: Event[]
  events?: {
    stats: {
      count: number
    }
  }
  // subscriptions?: Subscription[]
  subscriptions?: {
    stats: {
      count: number
    }
  }
}

export const usersInfo = `
  id
  position
  member_code
  avatar_url
  type
  is_active
`

export interface User {
  id: string
  member_code: string
  password?: string
  type?: string
  position?: string
  avatar_url?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
  member_info?: Member
  frontend_errors?: {
    stats: {
      count: number
    }
  }
}

export interface LoginInput {
  memberCode: string
  password: string
}
