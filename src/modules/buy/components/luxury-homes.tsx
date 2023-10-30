import React from 'react'
import Link from 'next/link'
import { ListItem } from '../home/components 2.0'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const LuxuryHomes = () => {
  return (
    <div className="pt-16 bg-light-white px-14 pb-10">
      <h1 className="text-dark-prussian-blue font-extrabold text-2xl">Luxury Homes</h1>
      <Link
        href=""
        className="mt-2 text-colors-cadet text-sm underline hover:text-primary duration-150 ease-in"
      >
        View all luxury Homes
      </Link>

      <div className="relative mt-5 pb-8">
        <Carousel
          swipeable={false}
          draggable={false}
          ssr={true}
          renderDotsOutside={true}
          showDots
          itemClass="my-5"
          partialVisible={true}
          responsive={responsive}
        >
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </Carousel>
      </div>
    </div>
  )
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 70,
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
