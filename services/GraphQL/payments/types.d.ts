import { Member } from '../users/types'

export const paymentInfo = `
  is_confirmed
  in_review
  is_reversed
  quantity
  reference_details
  reference_id
  total_price
`

export interface Payment {
  id: string
  is_confirmed: boolean
  in_review: boolean
  is_reversed: boolean
  quantity: number
  reference_details: string
  reference_id: string
  total_price: number
  created_at: string
  updated_at: string
  member_information: Member
}
