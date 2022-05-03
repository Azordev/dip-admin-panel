import { GetStaticPaths } from 'next'
import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_USER_BY_ID } from '../../services/GraphQL/queries/users'
import { User as UserProp } from '../../services/GraphQL/types/users'
import ClientOnly from '../../views/Shared/ClientOnly'

const User: React.FC<{ user: UserProp }> = ({ user }) => (
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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { data } = await client.query({
    query: GET_USER_BY_ID,
  })

  const paths = data.users.map((user: UserProp) => ({
    params: {
      id: user.id.toString(),
    },
  }))
  return {
    paths,
    fallback: 'blocking', // indicates the type of fallback
  }
}
