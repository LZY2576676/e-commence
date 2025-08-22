import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category, subCategory, productId}) => {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])
    const scrollContainerRef = useRef(null)

    // 滚动控制函数
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // 每次滚动的像素
            const container = scrollContainerRef.current;
            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    }

    useEffect(() => {
        if(products.length > 0 && category && subCategory){
            console.log("RelatedProducts: Filtering products for category:", category, "subCategory:", subCategory);

            let productsCopy = products.slice();
            productsCopy = productsCopy.filter(item => category === item.category);
            productsCopy = productsCopy.filter(item => subCategory === item.subCategory);
            // Filter out the current product
            if (productId) {
              productsCopy = productsCopy.filter(item => item._id !== productId);
            }

            // 增加显示的相关商品数量
            setRelated(productsCopy.slice(0, 10));
        } else {
            console.log("RelatedProducts: Missing required data", { 
                productsLength: products?.length, 
                category, 
                subCategory,
                productId 
            });
        }
    }, [products, category, subCategory, productId])

    // Don't render if no related products
    if (!related.length) {
        return null;
    }

    return (
        <div className='my-16'>
            <div className='flex justify-between items-center mb-4'>
                <div className='text-2xl'>
                    <Title text1={'Related'} text2={'Products'} />
                </div>
                <div className='flex gap-2'>
                    <button 
                        onClick={() => scroll('left')}
                        className='bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600'
                    >
                        &larr;
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className='bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600'
                    >
                        &rarr;
                    </button>
                </div>
            </div>

            {/* 水平滚动容器 */}
            <div 
                ref={scrollContainerRef}
                className='flex overflow-x-auto gap-4 pb-4 hide-scrollbar'
                style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none',  /* IE and Edge */
                }}
            >
                {related.map((item, index) => (
                    <div key={index} className='flex-shrink-0' style={{ width: '180px' }}>
                        <ProductItem id={item._id} name={item.name} price={item.price} image={item.image}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts