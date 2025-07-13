import React from 'react'
import Hero from '../components/Hero'
import FeatureJobs from '../components/FeatureJobs'
import JobCategories from '../components/JobCategories'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
        <Hero/>
        <JobCategories/>
        <FeatureJobs/>
        <Testimonials/>
        <NewsLetter/>
    </>
  )
}

export default Home