import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => (item.bestseller));
            setBestSellerProducts(bestProduct.slice(0,5));
        }
    }, [products]);

  return (
    <div className='my-16'>
        <div className='text-center'>
            <Title text1={'BEST '} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        
        <div 
            className='grid gap-4 gap-y-6 px-4' 
            style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                maxWidth: '1400px',
                margin: '0 auto'
            }}
        >
            {
                bestSellerProducts.map((item,index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller