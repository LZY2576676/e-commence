import React from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('description'); // 添加标签状态

  console.log('Product component rendering with productId:', productId);
  console.log('Products from context:', products);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProductData = () => {
    try {
      console.log('Fetching product data for ID:', productId);
      console.log('Available products:', products);
      
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }
      
      const product = products.find(item => item._id === productId);
      console.log('Found product:', product);
      
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
        // 不要自动选中尺码
        // if (product.sizes && product.sizes.length > 0) {
        //   setSelectedSize(product.sizes[0]);
        // }
        setLoading(false);
      } else {
        console.error('Product not found');
        setError('Product not found');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching product data:', err);
      setError('Error loading product data');
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    if (products && products.length > 0) {
      console.log('Products are available, fetching data...');
      fetchProductData();
    } else {
      console.log('No products available yet');
    }
  }, [productId, products, location.pathname]);

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem'}}>
        <p style={{color: '#6B7280'}}>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem'}}>
        <p style={{color: '#EF4444'}}>{error}</p>
      </div>
    );
  }

  return productData ? (
    <div style={{padding: '1.5rem 1rem', maxWidth: '1200px', margin: '0 auto'}}>
      {/* 移动端布局 */}
      <div style={{display: windowWidth < 768 ? 'block' : 'none'}}>
        <h1 style={{fontSize: '1.25rem', fontWeight: '500', color: '#1F2937', marginBottom: '0.5rem'}}>{productData.name}</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem'}}>
          <div style={{display: 'flex'}}>
            <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
            <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
            <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
            <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
            <img src={assets.star_dull_icon} alt="" style={{width: '1rem', height: '1rem'}} />
          </div>
          <span style={{color: '#6B7280', marginLeft: '0.25rem', fontSize: '0.875rem'}}>(122)</span>
        </div>
        
        <img src={image} alt={productData.name} style={{width: '100%', height: 'auto', marginBottom: '1rem'}} />
        
        <div style={{display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem'}}>
          {productData.image.map((item, index) => (
            <div 
              key={index} 
              style={{
                border: image === item ? '1px solid #6B7280' : '1px solid #E5E7EB', 
                cursor: 'pointer', 
                minWidth: '60px', 
                maxWidth: '60px'
              }}
              onClick={() => setImage(item)}
            >
              <img src={item} alt={`${productData.name} view ${index+1}`} style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
            </div>
          ))}
        </div>
        
        <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
          <span style={{fontSize: '1.5rem', fontWeight: '500'}}>{currency}{productData.price}</span>
        </div>
        
        <p style={{color: '#4B5563', marginBottom: '1.5rem'}}>{productData.description}</p>
        
        <div style={{marginBottom: '1.5rem'}}>
          <p style={{fontWeight: '500', marginBottom: '0.5rem'}}>Select Size</p>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            {productData.sizes.map((size, index) => (
              <button 
                key={index} 
                style={{
                  width: '2.5rem', 
                  height: '2.5rem', 
                  border: selectedSize === size ? '1px solid black' : '1px solid #D1D5DB',
                  backgroundColor: selectedSize === size ? '#F3F4F6' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          style={{
            width: '100%', 
            backgroundColor: isButtonActive ? '#4B5563' : isButtonHovered ? '#333333' : 'black', 
            color: 'white', 
            padding: '0.75rem 0',
            transition: 'background-color 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => {
            setIsButtonHovered(false);
            setIsButtonActive(false);
          }}
          onMouseDown={() => setIsButtonActive(true)}
          onMouseUp={() => setIsButtonActive(false)}
          onClick={() => {
            addToCart(productData._id, selectedSize);
            console.log('Added to cart:', productData.name, 'Size:', selectedSize);
          }}
        >
          Add to Cart
        </button>

        {/* 横线和产品保证信息 */}
        <div className="mt-8">
          <hr className="border-none h-[1px] bg-gray-200 mb-6" />
          
          <div className="text-sm text-gray-500">
            <p className="mb-3 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
              100% Original product.
            </p>
            <p className="mb-3 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
              Cash on delivery is available on this product.
            </p>
            <p className="flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>

        {/* 移动端的Description和Reviews区域 - 改进版 */}
        <div className='mt-16 w-full'>
          <div className='flex rounded-t-lg overflow-hidden'>
            <button 
              className={`px-5 py-3 text-sm w-1/2 text-center font-medium transition-all ${activeTab === 'description' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-5 py-3 text-sm w-1/2 text-center font-medium transition-all ${activeTab === 'reviews' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (122)
            </button>
          </div>
          <div className='flex flex-col gap-4 border border-gray-200 rounded-b-lg px-6 py-6 text-sm text-gray-500 bg-white shadow-sm'>
            {activeTab === 'description' ? (
              <>
                <p>
                  An e-commerce website is an online platform that allows businesses to sell products or services to customers. It typically includes a shopping cart, payment processing, and shipping options.
                </p>
                <p>
                  E-commerce websites are designed to provide a seamless shopping experience for customers. They typically feature a user-friendly interface, secure payment options, and efficient shipping services.
                </p>
              </>
            ) : (
              <p>Customer reviews will be displayed here.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* 桌面端布局 */}
      <div style={{display: windowWidth >= 768 ? 'block' : 'none'}}>
        {/* 产品信息主区域 */}
        <div style={{display: 'flex'}}>
          {/* 左侧小图列表 */}
          <div style={{width: '80px'}}>
            {productData.image.map((item, index) => (
              <div 
                key={index} 
                style={{
                  border: image === item ? '1px solid #6B7280' : '1px solid #E5E7EB',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }}
                onClick={() => setImage(item)}
              >
                <img src={item} alt={`${productData.name} view ${index+1}`} style={{width: '100%', height: 'auto', objectFit: 'cover'}} />
              </div>
            ))}
          </div>
          
          {/* 中间主图 */}
          <div style={{width: '320px', marginLeft: '2rem', marginRight: '2rem'}}>
            <img 
              src={image} 
              alt={productData.name} 
              style={{width: '100%', height: 'auto', objectFit: 'contain', maxHeight: '400px'}}
            />
          </div>
          
          {/* 右侧商品信息 */}
          <div style={{maxWidth: '400px', marginLeft: '1rem'}}>
            <h1 style={{fontSize: '1.5rem', fontWeight: '500', color: '#1F2937', marginBottom: '0.5rem'}}>{productData.name}</h1>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem'}}>
              <div style={{display: 'flex'}}>
                <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
                <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
                <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
                <img src={assets.star_icon} alt="" style={{width: '1rem', height: '1rem'}} />
                <img src={assets.star_dull_icon} alt="" style={{width: '1rem', height: '1rem'}} />
              </div>
              <span style={{color: '#6B7280', marginLeft: '0.25rem', fontSize: '0.875rem'}}>(122)</span>
            </div>
            
            <div style={{marginBottom: '1rem'}}>
              <span style={{fontSize: '1.5rem', fontWeight: '500'}}>{currency}{productData.price}</span>
            </div>
            
            <p style={{color: '#4B5563', marginBottom: '1.5rem'}}>{productData.description}</p>
            
            <div style={{marginBottom: '1.5rem'}}>
              <p style={{fontWeight: '500', marginBottom: '0.5rem'}}>Select Size</p>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                {productData.sizes.map((size, index) => (
                  <button 
                    key={index} 
                    style={{
                      width: '2.5rem', 
                      height: '2.5rem', 
                      border: selectedSize === size ? '1px solid black' : '1px solid #D1D5DB',
                      backgroundColor: selectedSize === size ? '#F3F4F6' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              style={{
                width: '100%', 
                backgroundColor: isButtonActive ? '#4B5563' : isButtonHovered ? '#333333' : 'black', 
                color: 'white', 
                padding: '0.75rem 0',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => {
                setIsButtonHovered(false);
                setIsButtonActive(false);
              }}
              onMouseDown={() => setIsButtonActive(true)}
              onMouseUp={() => setIsButtonActive(false)}
              onClick={() => {
                addToCart(productData._id, selectedSize);
                console.log('Added to cart:', productData.name, 'Size:', selectedSize);
              }}
            >
              Add to Cart
            </button>

            {/* 横线和产品保证信息 */}
            <div className="mt-8">
              <hr className="border-none h-[1px] bg-gray-200 mb-6" />
              
              <div className="text-sm text-gray-500">
                <p className="mb-3 flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
                  100% Original product.
                </p>
                <p className="mb-3 flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
                  Cash on delivery is available on this product.
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
                  Easy return and exchange policy within 7 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description和Reviews区域 - 改进版 */}
        <div className='mt-20 w-full'>
          <div className='flex rounded-t-lg overflow-hidden'>
            <button 
              className={`px-5 py-3 text-sm w-1/2 text-center font-medium transition-all ${activeTab === 'description' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-5 py-3 text-sm w-1/2 text-center font-medium transition-all ${activeTab === 'reviews' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (122)
            </button>
          </div>
          <div className='flex flex-col gap-4 border border-gray-200 rounded-b-lg px-6 py-6 text-sm text-gray-500 bg-white shadow-sm'>
            {activeTab === 'description' ? (
              <>
                <p>
                  An e-commerce website is an online platform that allows businesses to sell products or services to customers. It typically includes a shopping cart, payment processing, and shipping options.
                </p>
                <p>
                  E-commerce websites are designed to provide a seamless shopping experience for customers. They typically feature a user-friendly interface, secure payment options, and efficient shipping services.
                </p>
              </>
            ) : (
              <p>Customer reviews will be displayed here.</p>
            )}
          </div>
        </div>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} productId={productId}/>
      </div>
    </div>
  ) : (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem'}}>
      <p style={{color: '#6B7280'}}>No product data available</p>
    </div>
  )
}

export default Product