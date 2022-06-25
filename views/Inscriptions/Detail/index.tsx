import { FC } from 'react'

import { Inscription } from '@/services/GraphQL/inscriptions/types'

const InscriptionDetail: FC<{ inscription: Inscription }> = ({ inscription }) => (
  <div>
    <h1>{inscription.attendee_member.email}</h1>
    <p>{inscription.event_information.date}</p>
  </div>
)

export default InscriptionDetail
