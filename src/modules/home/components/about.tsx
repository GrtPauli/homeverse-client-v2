import React from 'react'

export const AboutUs = () => {
  return (
    <div className="py-16 bg-light-white px-14">
      <section className="cta about-us">
        <div className="container">
          <div className="cta-card bg-dark-prussian-blue shadow-lg rounded">
            <div className="card-content">
              <h2 className="h2 card-title">Know More About Us</h2>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, numquam!
              </p>
            </div>

            <button className="btn cta-btn font-bold">
              <span>Visit About Us</span>

              {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
