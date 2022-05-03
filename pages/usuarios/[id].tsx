import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_USER_BY_ID } from '../../services/GraphQL/queries/users'
import ClientOnly from '../../views/Shared/ClientOnly'

interface User {
  id: string
  name: string
  email: string
}
const User: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <ClientOnly>
        {user && (
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        )}
      </ClientOnly>
    </div>
  )
}

export default User

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_USER_BY_ID,
  })

  return {
    props: {
      user: data.user,
    },
  }
}
