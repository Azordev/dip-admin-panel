import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import styles from '../../styles/Home.module.css'
import ClientOnly from '../../views/Shared/ClientOnly'
import { GET_MEMBERS } from '../../services/GraphQL/queries/users'
import { Member } from '../../services/GraphQL/types/users'

const Members: NextPage = () => {
  const { data, loading } = useQuery(GET_MEMBERS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  const members: Member[] = data.members

  return (
    <ClientOnly>
      <div className={styles.container}>
        <h1 className={styles.title}>Events</h1>

        {members.map(member => (
          <div key={member.id} className={styles.card}>
            <h2>{member.first_names}</h2>
            <p>{member.email}</p>
          </div>
        ))}
      </div>
    </ClientOnly>
  )
}

export default Members
