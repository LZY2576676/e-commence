import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('submitted');
  }
  return (
    <div className='text-center bg-gray-50 py-12 px-4 my-16'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
          <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none py-3 bg-transparent' required/>
          <button type='submit' className='bg-black text-white px-6 py-3 hover:bg-gray-800 transition'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox 