import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { cartItems, products, currency, delivery_fee } = useContext(ShopContext);
  
  const [totalAmount, setTotalAmount] = useState(0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate total amount
  useEffect(() => {
    let tempTotal = 0;
    
    if (products && products.length > 0) {
      for (const itemId in cartItems) {
        const product = products.find(item => item._id === itemId);
        if (product) {
          for (const size in cartItems[itemId]) {
            tempTotal += product.price * cartItems[itemId][size];
          }
        }
      }
    }
    
    setTotalAmount(tempTotal);
  }, [cartItems, products]);
  
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      // Order processing logic...
      toast.success('Order submitted successfully!');
      navigate('/orders');
    }, 1500);
  };

  // Check if cart is empty
  const isCartEmpty = Object.keys(cartItems).length === 0;

  // 定义内联样式
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    paddingTop: '32px',
    paddingBottom: '32px'
  };

  const rowStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '24px'
  };

  const columnStyle = {
    flex: '1',
    minWidth: '300px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    padding: '24px',
    marginBottom: '24px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: '24px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e5e7eb'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: isSubmitting ? 'rgba(0,0,0,0.7)' : '#000',
    color: 'white',
    padding: '12px 0',
    borderRadius: '4px',
    border: 'none',
    fontWeight: '500',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16px'
  };

  const paymentMethodStyle = (isSelected) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    border: isSelected ? '2px solid #000' : '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: isSelected ? '#f9fafb' : 'white',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  if (isCartEmpty) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-medium mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">You need to add items to your cart before checkout</p>
          <button onClick={() => navigate('/collection')} className="bg-black text-white py-3 px-8 rounded hover:bg-gray-800 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center'}}>Checkout</h1>
      <form onSubmit={handlePlaceOrder}>
        <div style={rowStyle}>
          {/* LEFT COLUMN - Delivery Information */}
          <div style={columnStyle}>
            <div style={cardStyle}>
              <h2 style={titleStyle}>Delivery Information</h2>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Last Name*</label>
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                    required
                  />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>First Name*</label>
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                    required
                  />
                </div>
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Email Address*</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                  required
                />
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Phone Number*</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                  required
                />
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Address*</label>
                <input 
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                  required
                />
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>City*</label>
                  <input 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                    required
                  />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>State/Province*</label>
                  <input 
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                    required
                  />
                </div>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Zip Code*</label>
                  <input 
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                    required
                  />
                </div>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Country*</label>
                  <input 
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px'}}>Company Name (Optional)</label>
                <input 
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', outline: 'none'}}
                />
              </div>
            </div>
            
            <div style={cardStyle}>
              <h3 style={{fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#4b5563'}}>Order Protection</h3>
              <ul style={{fontSize: '12px', color: '#6b7280'}}>
                <li style={{display: 'flex', alignItems: 'flex-start', marginBottom: '8px'}}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    style={{ width: '10px', height: '10px', marginRight: '5px', marginTop: '2px', color: '#10B981', flexShrink: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Payment Protection
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start', marginBottom: '8px'}}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    style={{ width: '10px', height: '10px', marginRight: '5px', marginTop: '2px', color: '#10B981', flexShrink: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  7-Day Easy Return
                </li>
                <li style={{display: 'flex', alignItems: 'flex-start'}}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    style={{ width: '10px', height: '10px', marginRight: '5px', marginTop: '2px', color: '#10B981', flexShrink: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Full Shipment Tracking
                </li>
              </ul>
            </div>
          </div>
          
          {/* RIGHT COLUMN - Payment Method and Order Summary */}
          <div style={columnStyle}>
            {/* Payment Method Section */}
            <div style={cardStyle}>
              <h2 style={titleStyle}>Payment Method</h2>
              
              <div style={{marginBottom: '16px'}}>
                <div 
                  style={paymentMethodStyle(method === 'stripe')}
                  onClick={() => setMethod('stripe')}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="stripe" 
                    checked={method === 'stripe'}
                    onChange={() => setMethod('stripe')}
                    style={{display: 'none'}}
                  />
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        border: method === 'stripe' ? '2px solid #000' : '2px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}>
                        {method === 'stripe' && <div style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000'}}></div>}
                      </div>
                      <img style={{height: '32px'}} src={assets.stripe_logo} alt="Stripe" />
                    </div>
                    <div style={{fontSize: '14px', color: '#6b7280'}}>Credit Card Payment</div>
                  </div>
                </div>
                
                <div 
                  style={paymentMethodStyle(method === 'razorpay')}
                  onClick={() => setMethod('razorpay')}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="razorpay" 
                    checked={method === 'razorpay'}
                    onChange={() => setMethod('razorpay')}
                    style={{display: 'none'}}
                  />
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        border: method === 'razorpay' ? '2px solid #000' : '2px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}>
                        {method === 'razorpay' && <div style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000'}}></div>}
                      </div>
                      <img style={{height: '32px'}} src={assets.razorpay_logo} alt="Razorpay" />
                    </div>
                    <div style={{fontSize: '14px', color: '#6b7280'}}>Digital Wallet</div>
                  </div>
                </div>
                
                <div 
                  style={paymentMethodStyle(method === 'cod')}
                  onClick={() => setMethod('cod')}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={method === 'cod'}
                    onChange={() => setMethod('cod')}
                    style={{display: 'none'}}
                  />
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        border: method === 'cod' ? '2px solid #000' : '2px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}>
                        {method === 'cod' && <div style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000'}}></div>}
                      </div>
                      <span style={{fontWeight: '500'}}>CASH ON DELIVERY</span>
                    </div>
                    <div style={{fontSize: '14px', color: '#6b7280'}}>Pay when you receive</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div style={{...cardStyle, position: 'sticky', top: '16px'}}>
              <h2 style={titleStyle}>Order Summary</h2>
              
              <div style={{marginBottom: '12px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#4b5563'}}>
                  <span>Subtotal</span>
                  <span>{currency}{totalAmount.toFixed(2)}</span>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#4b5563'}}>
                  <span>Shipping</span>
                  <span>{currency}{delivery_fee.toFixed(2)}</span>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#4b5563'}}>
                  <span>Tax</span>
                  <span>{currency}{(totalAmount * 0.05).toFixed(2)}</span>
                </div>
              </div>
              
              <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginTop: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '18px'}}>
                  <span>Total</span>
                  <span>{currency}{(totalAmount + delivery_fee + totalAmount * 0.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              style={buttonStyle}
            >
              {isSubmitting ? (
                <>
                  <svg style={{animation: 'spin 1s linear infinite', marginRight: '8px', width: '16px', height: '16px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{opacity: '0.25'}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{opacity: '0.75'}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder