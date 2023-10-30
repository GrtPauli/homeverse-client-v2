import AuthPage from '@/modules/auth/page'
import React from 'react'

const Auth = ({ id }: any) => {
  return <AuthPage id={id} />
}

export default Auth

export async function getServerSideProps({ query, req }: any) {
  return {
    props: { id: query.id },
  }
}
