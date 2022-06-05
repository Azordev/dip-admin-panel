export interface User {
  id: string
  username: string
  password?: string
  type?: string
  avatar_url?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export interface Member {
  id: string
  first_names: string
  last_names?: string
  email: string
  created_at?: string
  updated_at?: string
  user_id: string
}

export interface LoginInput {
  username: string
  password: string
}
