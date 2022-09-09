import { NextPage } from 'next'

import ClientOnly from '@/views/Shared/ClientOnly'

import ProfileContainers from 'containers/Perfil/ProfileContainers'

const Profile: NextPage = () => (
    <ClientOnly>
      <ProfileContainers />
    </ClientOnly>
  )

export default Profile
