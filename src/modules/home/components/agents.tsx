import React from 'react'
import { ListItem } from './listitem2'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useHomeContext } from '../context'
import { AgentListItem } from '@/modules/agent/components'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
}

export const TopAgents = () => {
  const { topAgents } = useHomeContext()

  return (
    <div className="py-16 pb-10 bg-light-cultured-3">
      <div className="px-14">
        <h1 className="text-dark-jungle-green font-extrabold text-3xl">Top Agents</h1>
        <p className="mt-2 text-colors-cadet text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, error!
        </p>
      </div>

      <div className="relative mt-5 pb-14 px-10">
        <Carousel
          swipeable={false}
          draggable={false}
          ssr={true}
          renderDotsOutside={true}
          showDots
          itemClass="my-5 pl-5"
          // dotListClass="pt-5"
          partialVisible={true}
          responsive={responsive}
        >
          {topAgents.map((item, i) => (
            <AgentListItem item={item} key={i} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}
