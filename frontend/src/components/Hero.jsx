import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  // 使用useState和useEffect来处理响应式布局
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 定义横线的样式，确保它们可见
  const lineStyle = {
    width: '40px',
    height: '3px',
    backgroundColor: '#414141',
    display: 'block'
  };

  // 定义标题样式，直接设置字体大小
  const titleStyle = {
    fontFamily: 'Prata, serif',
    fontWeight: 'bold',
    color: '#414141'
  };

  // 容器样式
  const containerStyle = {
    display: 'flex',
    flexDirection: isDesktop ? 'row' : 'column',
    border: '1px solid #9CA3AF',
    overflow: 'hidden',
    borderRadius: '0.5rem',
    margin: '0.5rem 0 1.5rem 0'
  };

  // 文本区域样式
  const textContainerStyle = {
    width: isDesktop ? '50%' : '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem 1rem',
    backgroundColor: 'white',
    order: isDesktop ? 1 : 1 // 在移动端始终为1（在上面）
  };

  // 图片区域样式
  const imageContainerStyle = {
    width: isDesktop ? '50%' : '100%',
    height: isDesktop ? 'auto' : '12rem',
    backgroundColor: '#FEE2E2', // 明显的粉色背景
    order: isDesktop ? 2 : 2 // 在移动端始终为2（在下面）
  };

  // Shop now button style
  const buttonStyle = {
    backgroundColor: 'black', 
    color: 'white', 
    padding: isDesktop ? '0.75rem 1.5rem' : '0.5rem 1rem', 
    fontSize: isDesktop ? '1rem' : '0.875rem', 
    borderRadius: '0.25rem', 
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    transition: 'background-color 0.3s'
  };

  return (
    <div style={containerStyle}>
      {/* 文本内容 - 在移动端在上面，在桌面端占据左半部分 */}
      <div style={textContainerStyle}>
        <div style={{textAlign: isDesktop ? 'left' : 'center', width: '100%', maxWidth: isDesktop ? '28rem' : '20rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: isDesktop ? 'flex-start' : 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
            <div style={lineStyle}></div>
            <p style={{fontWeight: '500', fontSize: isDesktop ? '0.875rem' : '0.75rem', textTransform: 'uppercase', color: '#4B5563'}}>OUR BESTSELLERS</p>
          </div>
          
          <h1 style={{...titleStyle, fontSize: isDesktop ? '2.25rem' : '1.5rem', marginBottom: '0.75rem', lineHeight: '1.2'}}>Latest Arrivals</h1>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: isDesktop ? 'flex-start' : 'center', gap: '0.5rem', marginBottom: '1rem'}}>
            <p style={{fontWeight: '600', fontSize: isDesktop ? '0.875rem' : '0.75rem', textTransform: 'uppercase', color: '#4B5563'}}>SHOP NOW</p>
            <div style={lineStyle}></div>
          </div>
          
          <Link to="/collection" style={buttonStyle}>
            Shop Now
          </Link>
        </div>
      </div>
      
      {/* 图片 - 在移动端在下面，在桌面端占据右半部分 */}
      <div style={imageContainerStyle}>
        <img 
          src={assets.hero_img} 
          alt="Hero Image" 
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
        />
      </div>
    </div>
  )
}

export default Hero
