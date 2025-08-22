import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 my-16'>
      <div className='border border-gray-200 rounded-lg p-6 md:p-10'>
        <div className='flex flex-row justify-between items-start gap-4 md:gap-8'>
          {/* Exchange Policy */}
          <div className='flex flex-col items-center text-center flex-1'>
            <img src={assets.exchange_icon} alt="Exchange Policy" className='w-16 h-16 mb-4' />
            <p className='font-semibold text-base md:text-lg mb-2'>Free Exchange</p>
            <p className='text-gray-500 text-xs md:text-sm'>We offer hassle free exchange policy</p>
          </div>
          
          {/* Quality Guarantee */}
          <div className='flex flex-col items-center text-center flex-1'>
            <img src={assets.quality_icon} alt="Quality Guarantee" className='w-16 h-16 mb-4' />
            <p className='font-semibold text-base md:text-lg mb-2'>Quality Guarantee</p>
            <p className='text-gray-500 text-xs md:text-sm'>We ensure the best quality products</p>
          </div>
          
          {/* Customer Support */}
          <div className='flex flex-col items-center text-center flex-1'>
            <img src={assets.support_img} alt="Customer Support" className='w-16 h-16 mb-4' />
            <p className='font-semibold text-base md:text-lg mb-2'>24/7 Customer Support</p>
            <p className='text-gray-500 text-xs md:text-sm'>Dedicated support whenever you need</p>
          </div>
        </div>

        <div className='text-center mt-10 border-t border-gray-200 pt-6'>
          <p className='font-medium'>Subscribe now & get 20% off</p>
          <p className='text-gray-500 text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy