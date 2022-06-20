import { Payment } from '../payments/types.d'
import { Member } from '../users/types.d'

export const subscriptionInfo = `
  status
  type
  expiration
  details
`

export interface SubscriptionBase {
  status: string
  type: string
  expiration: string
  details: string
}

export interface SubscriptionEditable extends SubscriptionBase {
  status?: 'ACTIVE' | 'INACTIVE' | 'CANCELLED'
  type?: 'BASIC' | 'STANDARD' | 'PREMIUM'
  expiration?: string
  details?: string
}

export interface Subscription extends SubscriptionBase {
  id: string
  created_at: string
  updated_at: string
  payment: Payment
  member: Member
}
