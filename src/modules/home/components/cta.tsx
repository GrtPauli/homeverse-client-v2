import React from 'react'

export const CTA = () => {
  return (
    <div className="py-16 bg-light-white px-14">
      <section className="cta">
        <div className="container">
          <div className="cta-card shadow-lg rounded">
            <div className="card-content">
              <h2 className="h2 card-title">Looking for a dream home?</h2>

              <p className="card-text">We can help you realize your dream of a new home</p>
            </div>

            <button className="btn cta-btn font-bold">
              <span>Explore Properties</span>

              {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
