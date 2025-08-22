import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();


const ShopContextProvider = (props) =>{

    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});

    const addToCart = async (itemId,size) =>{

        if(!size){
            toast.error('Please select a size');
            return;
        }


        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Item added to cart!');
    }

    const updateCartItemQuantity = (itemId, size, action) => {
        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId] && cartData[itemId][size]) {
            if(action === 'increase') {
                // 增加商品数量
                cartData[itemId][size] += 1;
                setCartItems(cartData);
            } else if(action === 'decrease') {
                // 减少商品数量
                if(cartData[itemId][size] > 1) {
                    // 如果数量大于1，则减少1
                    cartData[itemId][size] -= 1;
                    setCartItems(cartData);
                } else {
                    // 如果数量为1，则调用removeFromCart函数删除商品
                    removeFromCart(itemId, size);
                    return;
                }
            }
        }
    }

    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId] && cartData[itemId][size]) {
            // 删除特定尺寸的商品
            delete cartData[itemId][size];
            
            // 如果该商品没有其他尺寸了，删除整个商品条目
            if(Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
            
            setCartItems(cartData);
            toast.success('Item removed from cart!');
        }
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const value = {
        products , currency , delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,removeFromCart,updateCartItemQuantity,
        getCartCount

    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
            <ToastContainer />
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;