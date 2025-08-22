import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='flex items-center justify-center gap-4 mb-6'>
      {/* 左侧横线 */}
      <div className='hidden md:block w-16 h-[2px] bg-gray-800'></div>
      
      {/* 标题文本 */}
      <h2 className='text-2xl md:text-3xl font-bold tracking-wide'>
        <span className='text-gray-500'>{text1}</span>
        <span className='text-gray-900'>{text2}</span>
      </h2>
      
      {/* 右侧横线 */}
      <div className='hidden md:block w-16 h-[2px] bg-gray-800'></div>
    </div>
  )
}

export default Title