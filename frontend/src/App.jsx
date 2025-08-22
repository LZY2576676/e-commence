// 导入React核心库，用于创建React组件
import React, { useEffect } from 'react'
// 从react-router-dom导入Routes和Route组件，用于路由管理
import { Routes, Route, useLocation } from 'react-router-dom'
// 导入各个页面组件
import Home from './pages/Home'
import Collection from './pages/Collection' 
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import TestPage from './pages/TestPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
// 不需要再导入ToastContainer，因为ShopContext中已经包含它了
// import { ToastContainer, toast } from 'react-toastify';

// 定义App组件
const App = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('App: Current location changed to', location.pathname);
    // 强制滚动到页面顶部，确保新页面从顶部开始显示
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className='px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-screen-2xl mx-auto'>
      {/* 移除重复的ToastContainer */}
      <Navbar/>
      <SearchBar/>
      <Routes key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/place-order' element={<PlaceOrder />}/>
        <Route path='/orders' element={<Orders />}/>
        <Route path='/test' element={<TestPage />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App