import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { cartItems, products, currency, delivery_fee } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  // 计算总金额
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

  return (
    <div className="bg-gray-50 p-6 rounded">
      <h3 className="text-lg font-medium mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>{currency}{totalAmount}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>{Object.keys(cartItems).length > 0 ? `${currency}${delivery_fee}` : `${currency}0`}</span>
      </div>
      <div className="border-t my-4"></div>
      <div className="flex justify-between font-medium mb-6">
        <span>Total</span>
        <span>{currency}{Object.keys(cartItems).length > 0 ? totalAmount + delivery_fee : 0}</span>
      </div>
    </div>
  );
};

export default CartTotal; 