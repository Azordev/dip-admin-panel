import Link from 'next/link'
import { FC } from 'react'

import { Inscription } from '@/services/GraphQL/inscriptions/types'

const InscriptionList: FC<{ inscriptions: Inscription[] }> = ({ inscriptions }) => (
  <>
    <h1>Inscriptions</h1>
    <ul>
      {inscriptions.map((inscription: Inscription) => (
        <li key={inscription.id}>
          <Link href={inscription.id}>Ver detalle</Link>
        </li>
      ))}
    </ul>
  </>
)

export default InscriptionList
