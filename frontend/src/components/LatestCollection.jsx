import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(()=>{
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0,10));
        }
    },[products]);

    // 根据窗口宽度动态设置列数
    const getGridColumns = () => {
        if (windowWidth < 768) {
            return 'repeat(2, 1fr)'; // 移动端显示2列
        } else {
            return 'repeat(5, 1fr)'; // 桌面端显示5列
        }
    };

    return (
        <div className='my-16'>
            <div className='text-center'>
                <Title text1={'LATEST '} text2={'COLLECTION'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            
            {/* 响应式网格布局 */}
            <div 
                className='grid gap-4 gap-y-6 px-4' 
                style={{
                    display: 'grid',
                    gridTemplateColumns: getGridColumns(),
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {latestProducts.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        image={item.image} 
                        name={item.name} 
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestCollection