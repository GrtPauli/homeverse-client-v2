import React, { FC, useEffect, useState } from 'react'
import Bedroom from '../../../../assets/images/bedroom.png'
import Bathroom from '../../../../assets/images/bathroom.png'
import Home from '../../../../assets/images/home.png'
import HomeSize from '../../../../assets/images/measure.png'
import { Image } from 'antd'
import CurrencyFormat from 'react-currency-format'
import { IListing } from '../../model'

interface IProps {
  listing: Partial<IListing>
}

export const ListingOverview: FC<IProps> = ({ listing }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image preview={false} width="80px" height="80px" src={Bedroom?.src} />

          <div>
            <p className="font-bold text-dark-prussian-blue">Bedrooms</p>
            <p className="text-colors-cadet text-sm">{listing.bedrooms}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Image preview={false} width="50px" height="50px" src={Bathroom?.src} />

          <div>
            <p className="font-bold text-dark-prussian-blue">Bathrooms</p>
            <p className="text-colors-cadet text-sm">{listing.bathrooms}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Image preview={false} width="50px" height="50px" src={Home?.src} />

          <div>
            <p className="font-bold text-dark-prussian-blue">Property Type</p>
            <p className="text-colors-cadet text-sm">{listing.homeType}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Image preview={false} width="50px" height="50px" src={HomeSize?.src} />

          <div>
            <p className="font-bold text-dark-prussian-blue">Property Size</p>
            <CurrencyFormat
              value={listing.propertySize}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => (
                <p className="text-colors-cadet text-sm">
                  {value} {listing?.propertySizeUnit}
                </p>
              )}
            />
          </div>
        </div>
      </div>

      <p className="text-sm font-light leading-7 mt-5">
        {listing.description}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas laudantium cumque
        delectus animi, velit totam illum itaque dignissimos quod dolor molestiae eveniet ut quasi
        maiores facere reiciendis impedit. Totam, veniam consequatur! Sequi vel laudantium
        doloremque ullam ipsa iusto eveniet debitis quos autem exercitationem cupiditate illum eum,
        inventore doloribus quod labore reprehenderit? Accusantium sapiente tempore illum rem illo
        quos! Architecto qui modi consequatur maxime hic nostrum officiis facilis. Ullam odit
        repellendus voluptas, vel pariatur error! Doloribus tempora rerum maiores sit aut, quo
        officia aliquid inventore veniam nemo ipsa modi non, suscipit itaque dolorem consequuntur
        corporis dolorum cupiditate similique autem vitae molestias.
      </p>
    </div>
  )
}
