import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products, currency, cartItems, removeFromCart, updateCartItemQuantity, getCartCount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Convert cart data to array
  useEffect(() => {
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Get product details for cart items
  useEffect(() => {
    setIsLoading(true);
    if(cartData.length > 0 && products.length > 0) {
      const tempProducts = [];
      let tempTotal = 0;
      
      cartData.forEach(item => {
        const product = products.find(p => p._id === item._id);
        if(product) {
          const cartProduct = {
            ...product,
            selectedSize: item.size,
            quantity: item.quantity
          };
          tempProducts.push(cartProduct);
          tempTotal += product.price * item.quantity;
        }
      });
      
      setCartProducts(tempProducts);
      setTotalAmount(tempTotal);
    } else {
      setCartProducts([]);
      setTotalAmount(0);
    }
    setTimeout(() => setIsLoading(false), 300);
  }, [cartData, products]);

  // Remove item from cart
  const handleRemoveFromCart = (id, size) => {
    removeFromCart(id, size);
  }

  // Update item quantity
  const handleQuantityChange = (id, size, value) => {
    const newQuantity = parseInt(value);
    
    if (!isNaN(newQuantity) && newQuantity > 0) {
      // If quantity increases
      if (newQuantity > cartItems[id][size]) {
        for (let i = cartItems[id][size]; i < newQuantity; i++) {
          updateCartItemQuantity(id, size, 'increase');
        }
      } 
      // If quantity decreases
      else if (newQuantity < cartItems[id][size]) {
        for (let i = cartItems[id][size]; i > newQuantity; i--) {
          updateCartItemQuantity(id, size, 'decrease');
        }
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium mb-8 text-center relative">
        <span className="relative inline-block">
          YOUR CART
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-20"></span>
        </span>
      </h1>
      
      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg shadow-sm my-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '32px', height: '32px', marginBottom: '1rem', color: '#9ca3af' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-500 mb-6 text-lg">Your cart is empty</p>
          <Link to="/collection" className="bg-black text-white py-3 px-8 hover:bg-gray-800 transition-colors duration-300 shadow-md">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {cartProducts.map((item, index) => (
                <div 
                  key={`${item._id}-${item.selectedSize}`} 
                  className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 ${index === 0 ? 'rounded-t-lg' : ''}`}
                >
                  {/* 商品图片 - 减小尺寸 */}
                  <div style={{ width: '200px', height: '200px', flexShrink: 0, backgroundColor: '#f9fafb', borderRadius: '4px', overflow: 'hidden' }}>
                    <img 
                      src={item.image[0]} 
                      alt={item.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  
                  <div style={{ marginLeft: '16px', flexGrow: 1 }}>
                    <Link 
                      to={`/product/${item._id}`} 
                      style={{ 
                        fontWeight: '500', 
                        color: '#1f2937', 
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'black'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#1f2937'}
                    >
                      {item.name}
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                      {/* 价格 */}
                      <span style={{ color: '#4b5563', fontWeight: '500' }}>{currency}{item.price}</span>
                      
                      {/* 尺码 - 增加间距 */}
                      <div style={{ 
                        marginLeft: '16px', 
                        padding: '2px 10px', 
                        backgroundColor: '#f3f4f6', 
                        fontSize: '0.75rem', 
                        color: '#4b5563', 
                        borderRadius: '9999px',
                        fontWeight: '500'
                      }}>
                        Size: {item.selectedSize}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, item.selectedSize, e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          width: '50px',
                          height: '36px',
                          textAlign: 'center',
                          borderRadius: '4px',
                          outline: 'none',
                          transition: 'all 0.2s'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      />
                    </div>
                    
                    {/* 删除按钮 - 改进样式使其更明显 */}
                    <button 
                      onClick={() => handleRemoveFromCart(item._id, item.selectedSize)}
                      style={{
                        marginLeft: '16px',
                        padding: '6px',
                        backgroundColor: '#f3f4f6',
                        color: '#9ca3af',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#fee2e2';
                        e.currentTarget.style.color = '#ef4444';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.color = '#9ca3af';
                      }}
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '18px', height: '18px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-medium mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{currency}{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{cartProducts.length > 0 ? `${currency}10.00` : `${currency}0.00`}</span>
                </div>
                {cartProducts.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span>{currency}{(totalAmount * 0.05).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between font-medium mb-6 text-lg">
                  <span>Total</span>
                  <span>{currency}{cartProducts.length > 0 ? (totalAmount + 10 + totalAmount * 0.05).toFixed(2) : "0.00"}</span>
                </div>
              </div>
              <Link 
                to="/place-order" 
                className="block w-full bg-black text-white py-3 px-4 text-center rounded-md hover:bg-gray-800 transition-colors duration-300 shadow-md"
              >
                Proceed to Checkout
              </Link>
              <div className="mt-4 text-xs text-center text-gray-500">
                <p className="flex items-center justify-center gap-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ width: '10px', height: '10px', marginRight: '4px' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {cartData.length > 0 && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium mb-3">Shopping Policy</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: '12px', height: '12px', marginRight: '6px', marginTop: '2px', flexShrink: 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Free shipping on orders over $100
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: '12px', height: '12px', marginRight: '6px', marginTop: '2px', flexShrink: 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Easy 30-day return policy
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: '12px', height: '12px', marginRight: '6px', marginTop: '2px', flexShrink: 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Secure payment processing
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Cart