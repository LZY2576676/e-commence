import React, { useState, useEffect, useContext } from 'react'
import {assets} from '../assets/assets'
import {NavLink, Link, useLocation} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const {setShowSearch,getCartCount} = useContext(ShopContext);
  const location = useLocation();
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 在路由变化时关闭移动菜单
  useEffect(() => {
    setVisible(false);
  }, [location.pathname]);
  
  // 导航链接样式
  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    color: isActive ? '#000' : '#4B5563'
  });
  
  // 链接文本样式
  const linkTextStyle = {
    letterSpacing: '1px',
    fontSize: '0.875rem',
    fontWeight: '500'
  };
  
  // 下划线样式
  const underlineStyle = (isActive) => ({
    width: '25%',
    height: '1.5px',
    backgroundColor: isActive ? '#000' : '#4B5563',
    border: 'none',
    margin: '0'
  });

  // 下拉菜单容器样式
  const dropdownContainerStyle = {
    position: 'relative'
  };

  // 下拉菜单样式
  const dropdownMenuStyle = {
    position: 'absolute',
    right: '-70px',
    top: '30px',
    width: '150px',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '12px 20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 50,
    display: showMenu ? 'block' : 'none'
  };

  // 下拉菜单项样式
  const dropdownItemStyle = {
    padding: '6px 0',
    fontSize: '0.875rem',
    color: '#4B5563',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none'
  };

  // 图标容器样式
  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isDesktop ? '15px' : '10px'
  };
  
  // 购物车徽章样式
  const cartBadgeStyle = {
    position: 'absolute',
    right: '-5px',
    bottom: '-5px',
    width: '16px',
    height: '16px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontWeight: 'bold'
  };

  // 移动端菜单样式
  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: visible ? '100%' : '0',
    backgroundColor: 'white',
    zIndex: 100,
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    boxShadow: visible ? '-4px 0 15px rgba(0, 0, 0, 0.1)' : 'none'
  };
  
  // 移动端菜单遮罩样式
  const mobileMenuOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99,
    opacity: visible ? 1 : 0,
    visibility: visible ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease'
  };

  // 导航容器样式
  const navbarContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    fontWeight: '500',
    position: 'relative',
    backgroundColor: 'white'
  };

  // Logo容器样式
  const logoContainerStyle = {
    flexShrink: 0
  };

  // 导航链接容器样式
  const navLinksContainerStyle = {
    display: isDesktop ? 'flex' : 'none',
    flexGrow: 1,
    justifyContent: 'center'
  };

  // 导航链接组样式
  const navLinksGroupStyle = {
    display: 'flex',
    gap: '30px'
  };
  
  return (
    <div style={navbarContainerStyle}>
      {/* 左侧Logo */}
      <div style={logoContainerStyle}>
        <Link to='/'><img 
          src={assets.logo} 
          alt="Logo"
          style={{
            width: isDesktop ? '100px' : '80px',
            height: 'auto'
          }}
          /></Link>
        
      </div>
      
      {/* 中间导航链接 - 在桌面端显示 */}
      <div style={navLinksContainerStyle}>
        <div style={navLinksGroupStyle}>
          <NavLink 
            to='/' 
            style={navLinkStyle}
            end
          >
            {({isActive}) => (
              <>
                <p style={{...linkTextStyle, color: isActive ? '#000' : '#4B5563'}}>HOME</p>
                <hr style={underlineStyle(isActive)} />
              </>
            )}
          </NavLink>
          
          <NavLink 
            to='/collection' 
            style={navLinkStyle}
            end
          >
            {({isActive}) => (
              <>
                <p style={{...linkTextStyle, color: isActive ? '#000' : '#4B5563'}}>COLLECTION</p>
                <hr style={underlineStyle(isActive)} />
              </>
            )}
          </NavLink>
          
          <NavLink 
            to='/about' 
            style={navLinkStyle}
            end
          >
            {({isActive}) => (
              <>
                <p style={{...linkTextStyle, color: isActive ? '#000' : '#4B5563'}}>ABOUT</p>
                <hr style={underlineStyle(isActive)} />
              </>
            )}
          </NavLink>
          
          <NavLink 
            to='/contact' 
            style={navLinkStyle}
            end
          >
            {({isActive}) => (
              <>
                <p style={{...linkTextStyle, color: isActive ? '#000' : '#4B5563'}}>CONTACT</p>
                <hr style={underlineStyle(isActive)} />
              </>
            )}
          </NavLink>
        </div>
      </div>
      
      {/* 右侧图标 */}
      <div style={iconContainerStyle}>
        <img
          onClick={()=>setShowSearch(true)}
          src={assets.search_icon} 
          alt="Search"
          style={{
            width: isDesktop ? '20px' : '16px',
            height: isDesktop ? '20px' : '16px',
            cursor: 'pointer'
          }}
        />

        <div 
          style={dropdownContainerStyle}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <Link to='/login'><img 
            src={assets.profile_icon} 
            alt="Profile"
            style={{
              width: isDesktop ? '20px' : '16px',
              height: isDesktop ? '20px' : '16px',
              cursor: 'pointer'
            }}
          /></Link>
          <div style={dropdownMenuStyle}>
            <Link to="/profile" style={{...dropdownItemStyle, display: 'block'}}>My Profile</Link>
            <Link to="/orders" style={{...dropdownItemStyle, display: 'block'}}>Orders</Link>
            <p style={dropdownItemStyle}>Logout</p>
          </div>
        </div>

        <Link to='/cart' style={{position: 'relative'}}>
          <img 
            src={assets.cart_icon} 
            alt="Cart"
            style={{
              width: isDesktop ? '20px' : '16px',
              height: isDesktop ? '20px' : '16px',
              cursor: 'pointer'
            }}
          />
          <div style={cartBadgeStyle}>
            {getCartCount()}
          </div>
        </Link>
        
        {/* 移动端菜单图标 */}
        {!isDesktop && (
          <img 
            src={assets.menu_icon} 
            alt="Menu"
            onClick={() => setVisible(true)}
            style={{
              width: '16px',
              height: '16px',
              cursor: 'pointer'
            }}
          />
        )}
      </div>
      
      {/* 移动端菜单遮罩 */}
      <div 
        style={mobileMenuOverlayStyle}
        onClick={() => setVisible(false)}
      ></div>
      
      {/* 移动端菜单 */}
      <div style={mobileMenuStyle}>
        <div style={{padding: '1.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
            <img 
              src={assets.logo} 
              alt="Logo"
              style={{
                width: '80px',
                height: 'auto'
              }}
            />
            <img 
              src={assets.cross_icon} 
              alt="Close"
              onClick={() => setVisible(false)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <Link 
              to='/' 
              style={{
                textDecoration: 'none',
                color: '#4B5563',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onClick={() => setVisible(false)}
            >
              HOME
            </Link>
            
            <Link 
              to='/collection' 
              style={{
                textDecoration: 'none',
                color: '#4B5563',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onClick={() => setVisible(false)}
            >
              COLLECTION
            </Link>
            
            <Link 
              to='/about' 
              style={{
                textDecoration: 'none',
                color: '#4B5563',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onClick={() => setVisible(false)}
            >
              ABOUT
            </Link>
            
            <Link 
              to='/contact' 
              style={{
                textDecoration: 'none',
                color: '#4B5563',
                fontSize: '1rem',
                fontWeight: '500'
              }}
              onClick={() => setVisible(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar