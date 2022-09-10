import { GetServerSideProps, NextPage } from 'next'

const Inscriptions: NextPage = () => <>Inscripciones</>

export default Inscriptions

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/eventos',
      permanent: true,
    },
  }
}
