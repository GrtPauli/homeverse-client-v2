import AgentDetailPage from '@/modules/agent/detail'
import React from 'react'

const AgentDetail = ({ id }: any) => {
  return <AgentDetailPage id={id}/>
}

export default AgentDetail

export async function getServerSideProps({ query, req }: any) {
  return {
    props: { id: query.id },
  }
}