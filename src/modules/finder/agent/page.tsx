import { AppLoader, FinderLayout } from '@/components'
import React, { useEffect } from 'react'
import { MapLocationSelector } from './location'
import User from '../../../assets/images/user.png'
import { Image } from 'antd'
import { Rate } from 'antd'
import { useFinderContext } from '../context'
import Link from 'next/link'

export const AgentFinderPage = () => {
  const { getAgents, agents, loading } = useFinderContext()
  useEffect(() => {
    getAgents()
  }, [])

  console.log(agents)

  return (
    <FinderLayout page="agents">
      <div className="px-12 py-10">
        <h1 className="text-4xl font-extrabold text-dark-prussian-blue mb-3">Find an Agent</h1>
        <p className="text-colors-cadet mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nam harum facere
          repellat, quidem quae. Consectetur repudiandae quod dolores nisi?
        </p>
        <div className="w-full py-10 bg-dark-prussian-blue"></div>

        <div className="flex gap-10 pt-10 items-start">
          <div className="map-2 w-[40%] shadow-lg rounded ">
            <MapLocationSelector />
          </div>

          <div className="flex flex-col gap-5 w-[60%]">
            {loading && (
              <div>
                <AppLoader loading={loading} />
              </div>
            )}

            {!loading &&
              agents.map((agent, i) => (
                <div
                  key={i}
                  className="py-5 px-5 shadow-md rounded w-full bg-light-white flex justify-between items-start"
                >
                  <div className="flex gap-5 items-center">
                    <Image
                      className="rounded-full"
                      preview={{
                        maskClassName: 'rounded-full',
                      }}
                      width="110px"
                      height="110px"
                      src={agent?.photo}
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-xl text-dark-prussian-blue mb-1">
                        {agent?.firstname} {agent?.lastname}
                      </h1>
                      <p className="mb-2">+2349134102236</p>
                      <p className="mb-2 text-sm text-colors-cadet">My Location is this........</p>
                      <p className="text-sm">My Professional Title</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between h-full gap-5">
                    <div className="flex flex-col items-end">
                      <Rate defaultValue={4} className="-mt-1" />
                      <p className="text-sm text-colors-cadet mt-1">681 Reviews</p>
                    </div>

                    <Link href={`/profile/${agent._id}`}>
                      <button className="border-primary rounded border text-primary font-bold text=sm py-2 px-5">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </FinderLayout>
  )
}
