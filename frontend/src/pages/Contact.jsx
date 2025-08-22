import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact '} text2={'Us'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[450px]' alt=""/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-600'>54709 Willms station<br/>Suite 350, Washington, USA</p>
          <p className='text-gray-600'>+1 234 567 890</p>
          <p className='text-gray-600'>forever@gmail.com</p>
          <p className='text-gray-600'>Monday-Friday: 9:00 AM - 5:00 PM</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'></button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact