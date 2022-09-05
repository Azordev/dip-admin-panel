const DIDAdminPanel = () => {
  return <h1>DID Admin Panel</h1>
}

export async function getStaticProps() {
  return {
    redirect: {
      permanent: false,
      destination: '/eventos',
    },
  }
}

export default DIDAdminPanel
