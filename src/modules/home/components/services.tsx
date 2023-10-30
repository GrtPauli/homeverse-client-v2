import React from 'react'
import Service1 from '../../../assets/images/service-1.png'
import Service2 from '../../../assets/images/service-2.png'
import Service3 from '../../../assets/images/service-3.png'
import Image from 'next/image'

export const Services = () => {
  return (
    <div className="py-16 bg-light-cultured-3 px-14">
      <h1 className="text-dark-prussian-blue font-black text-3xl">Our Services</h1>
      <p className="mt-2 text-colors-cadet text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, error!
      </p>
      <ul className="service-list flex mt-10 gap-8">
        <li>
          <div className="service-card shadow-lg rounded">
            <div className="card-icon">
              <Image alt="service" height={400} width={180} src={Service1} />
            </div>

            <h1 className="card-title font-bold text-xl text-dark-jungle-green">
              <a href="#">Buy a Home</a>
            </h1>

            <p className="card-text">
              over 1 million+ homes for sale available on the website, we can match you with a
              house you will want to call home.
            </p>

            <a href="#" className="card-link">
              <span>Find A Home</span>

              {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
            </a>
          </div>
        </li>

        <li>
          <div className="service-card shadow-lg rounded">
            <div className="card-icon">
              <Image alt="service" height={400} width={180} src={Service2} />
            </div>

            <h1 className="card-title font-bold text-xl text-dark-jungle-green">
              <a href="#">Rent a Home</a>
            </h1>

            <p className="card-text">
              over 1 million+ homes for sale available on the website, we can match you with a
              house you will want to call home.
            </p>

            <a href="#" className="card-link">
              <span>Find A Home</span>

              {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
            </a>
          </div>
        </li>

        <li>
          <div className="service-card shadow-lg rounded">
            <div className="card-icon">
              <Image alt="service" height={400} width={180} src={Service3} />
            </div>

            <h1 className="card-title font-bold text-xl text-dark-jungle-green">
              <a href="#">Sell a Home</a>
            </h1>

            <p className="card-text">
              over 1 million+ homes for sale available on the website, we can match you with a
              house you will want to call home.
            </p>

            <a href="#" className="card-link">
              <span>Find A Home</span>

              {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
            </a>
          </div>
        </li>
      </ul>
    </div>
  )
}
