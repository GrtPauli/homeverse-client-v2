import { ProfilePage } from '@/modules'
import React from 'react'

const Profile = ({ id }: any) => {
  return <ProfilePage id={id} />
}

export default Profile

export async function getServerSideProps({ query, req }: any) {
  return {
    props: { id: query.id },
  }
}
