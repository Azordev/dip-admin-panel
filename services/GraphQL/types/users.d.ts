export interface User {
  id: string
  name: string
  email: string
}

export interface Member {
  id: string
  first_names: string
  last_names?: string
  email: string
  avatar_url: string
  created_at?: string
  updated_at?: string
  user_id: string
}

export interface LoginInput {
  username: string
  password: string
}
