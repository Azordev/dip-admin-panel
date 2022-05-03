import { GetStaticPaths } from 'next'
import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_MEMBER_BY_ID } from '../../services/GraphQL/queries/users'
import { Member as MemberProps } from '../../services/GraphQL/types/users'
import ClientOnly from '../../views/Shared/ClientOnly'

const Member: React.FC<{ member: MemberProps }> = ({ member }) => (
  <div>
    <ClientOnly>
      {member && (
        <div>
          <h1>
            {member.first_names} {member.last_names}
          </h1>
          <p>{member.email}</p>
        </div>
      )}
    </ClientOnly>
  </div>
)

export default Member

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_MEMBER_BY_ID,
  })

  return {
    props: {
      user: data.member,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { data } = await client.query({
    query: GET_MEMBER_BY_ID,
  })

  const paths =
    data.members?.map((member: MemberProps) => ({
      params: {
        id: member.id.toString(),
      },
    })) || []
  return {
    paths,
    fallback: 'blocking', // indicates the type of fallback
  }
}
