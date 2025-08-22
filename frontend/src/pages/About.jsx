import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About '} text2={'Us'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Forever was born out of a passion for creating high-quality, stylish clothing that is both comfortable and affordable. Our mission is to provide our customers with the best possible shopping experience, from the moment they land on our website to the moment they receive their order.
          </p>
          <p>
            Since our inception, we have been committed to offering a wide range of products, from classic tees and hoodies to unique accessories and home decor. We believe that fashion should be accessible to everyone, and we strive to make our products available at affordable prices without compromising on quality.
          </p>
          <b className='text-gray-800'>
            Our mission
          </b>
          <p>
            Our mission at Forever is to provide our customers with the best possible shopping experience, from the moment they land on our website to the moment they receive their order. We believe that fashion should be accessible to everyone, and we strive to make our products available at affordable prices without compromising on quality.
          </p>

        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flexflex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>
            We meticulously select the finest materials and use advanced manufacturing techniques to ensure that each product is of the highest quality.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            With our user-friendly website and secure payment options, shopping has never been easier.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>
            Our team of dedicated professionals is always here to help you with any questions or concerns you may have.
          </p>
        </div>
        <NewsletterBox/>

      </div>
    </div>
  )
}

export default About