import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem'
import { useNavigate, Link } from 'react-router-dom'

const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

  // 根据窗口宽度动态设置列数
  const getGridColumns = () => {
    if (windowWidth < 640) {
      return 'repeat(2, 1fr)'; // 小屏幕显示2列
    } else if (windowWidth < 1024) {
      return 'repeat(3, 1fr)'; // 中等屏幕显示3列
    } else if (windowWidth < 1280) {
      return 'repeat(4, 1fr)'; // 较大屏幕显示4列
    } else {
      return 'repeat(5, 1fr)'; // 大屏幕显示5列
    }
  };

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=>item!==e.target.value));
    }else{
      setCategory(prev => [...prev,e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item=>item!==e.target.value));
    }else{
      setSubCategory(prev => [...prev,e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0){
      productsCopy = productsCopy.filter(item=>category.includes(item.category));
    }

    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item=>subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () =>{
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    if (products && products.length > 0) {
      setFilterProducts(products);
    }
  }, [products]);

  useEffect(()=>{
    if (products && products.length > 0) {
      applyFilter();
    }
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    if (filterProducts && filterProducts.length > 0) {
      sortProduct();
    }
  },[sortType])

  return (
    <div className='py-10 px-4 max-w-screen-2xl mx-auto'>
      <div className='flex flex-col sm:flex-row gap-6'>
        {/* 左侧筛选器 */}
        <div className='sm:w-60 flex-shrink-0'>
          <p className='mb-4 text-xl font-medium flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>
            FILTERS<img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
          </p>
          
          <div className={`border border-gray-300 p-4 mb-4 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2 items-center'>
                <input className='w-4 h-4' type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className='flex gap-2 items-center'>
                <input className='w-4 h-4' type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
              </p>
              <p className='flex gap-2 items-center'>
                <input className='w-4 h-4' type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
              </p>
            </div>
          </div>
          
          <div className={`border border-gray-300 p-4 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2 items-center'>
                <input className='w-4 h-4' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
              </p>
              <p className='flex gap-2 items-center'>
                <input className='w-4 h-4' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2 items-center'>
                <input className='w-4 h-4' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
              </p>
            </div>
          </div>
        </div>
        
        {/* 右侧商品列表 */}
        <div className='flex-1'>
          <div className='flex justify-between items-center mb-6'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            <select 
              onChange={(e)=>setSortType(e.target.value)} 
              className='border-2 border-gray-300 text-sm px-3 py-1 rounded'
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          
          {/* 响应式网格布局 */}
          <div 
            className='grid gap-x-4 gap-y-6' 
            style={{
              gridTemplateColumns: getGridColumns(),
            }}
          >
            {filterProducts.map((item, index) => (
              <div key={index} className="product-item-wrapper">
                <ProductItem 
                  name={item.name} 
                  id={item._id} 
                  price={item.price} 
                  image={item.image} 
                />
              </div>
            ))}
          </div>
          
          {/* 如果没有商品显示提示信息 */}
          {filterProducts.length === 0 && (
            <div className='text-center py-10'>
              <p className='text-gray-500'>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection