export const memberInfo = `
  id
  contact_information
  private_information
  email
  address
  first_names
  last_names
  user_id
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
  user_id: string
}

export const usersInfo = `
  id
  position
  avatar_url
  type
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
  member_information?: Member
}

export interface LoginInput {
  memberCode: string
  password: string
}
