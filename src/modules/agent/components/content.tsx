import React from 'react'
import { AgentListItem } from './item'
import { useAgentContext } from '../context'

export const Content = () => {
  const { agents } = useAgentContext()

  return (
    <div className="gap-14 pb-36 bg-light-cultured-3">
      <div className="bg-light-white w-full h-[60px] shadow-lg sticky top-24 z-[10]"></div>

      <div className="px-10 w-full flex flex-wrap gap-10 justify-center items-center mt-14">
        {agents.map((item, i) => (
          <AgentListItem key={i} item={item} />
        ))}

        {/* <AgentListItem/>
          <AgentListItem/>
          <AgentListItem/>
          <AgentListItem/>
          <AgentListItem/>
          <AgentListItem/>
          <AgentListItem/>
          <AgentListItem/> */}
      </div>
    </div>
  )
}
