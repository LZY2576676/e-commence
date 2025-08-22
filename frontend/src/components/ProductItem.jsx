import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);

  return (
    <Link 
      to={`/product/${id}`}
      className='block w-full cursor-pointer transition hover:opacity-90' 
      style={{ 
        textDecoration: 'none',  // 移除下划线
        color: '#333',           // 使用黑色文字
      }}
    >
        {/* 固定高宽比的图片容器 */}
        <div className='overflow-hidden bg-gray-50' style={{
            width: '100%',
            paddingBottom: '125%', /* 固定4:5的宽高比 */
            position: 'relative'
        }}>
            <img 
                className='hover:scale-105 transition ease-in-out duration-300 absolute top-0 left-0 w-full h-full object-cover' 
                src={image[0]} 
                alt={name}
            />
        </div>
        {/* 统一文本样式 */}
        <div className='pt-3 pb-1 h-14'>
            <p className='text-sm truncate text-gray-800'>{name}</p> 
            <p className='text-sm font-medium mt-1 text-gray-900'>
                {currency}{price}
            </p>
        </div>
    </Link>
  )
}

export default ProductItem