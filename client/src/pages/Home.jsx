import React from 'react'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Banners from '../components/Banners'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <Banners />
      {/* <Testimonial /> */}
      <Newsletter />
    </>
  )
}

export default Home
