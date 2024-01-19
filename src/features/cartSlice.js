import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


import {toast} from "react-toastify"

const user = localStorage.getItem("token");
    const decodedUser =  user? jwtDecode(user):null;
    const id = decodedUser? decodedUser.userId:null|| JSON.parse(localStorage.getItem('google-token'))?.uid;
    

const fetchCartData = createAsyncThunk('cart/fetchCartData', async () => {
    try {
      if(id){
      const response = await axios.get(`https://watchnest.onrender.com/api/user/${id}/cartData`); // Adjust the API endpoint
      return response.data;} // Assuming your API response has a 'cart' property
    } catch (error) {
      throw error;
    }
});

const removeFromCartOnBackend = createAsyncThunk('cart/removeFromCartOnBackend', async (cartItem) => {
    try {
      await axios.delete(`https://watchnest.onrender.com/api/user/${id}/cart/${cartItem._id}`);
      return cartItem;
    } catch (error) {
      throw error;
    }
  });
  
  const decreaseQuantityOnBackend = createAsyncThunk('cart/decreaseQuantityOnBackend', async (cartItem) => {
    try {
      await axios.patch(`https://watchnest.onrender.com/api/user/${id}/cart/${cartItem._id}`, { quantity: cartItem.cartQuantity - 1 });
      return cartItem;
    } catch (error) {
      throw error;
    }
  });
  
  const addToCartOnBackend = createAsyncThunk('cart/addToCartOnBackend', async (cartItem) => {
    try {
      await axios.post(`https://watchnest.onrender.com/api/user/${id}/cart`, cartItem);
      return cartItem;
    } catch (error) {
      throw error;
    }
  });
  
  const clearCartOnBackend = createAsyncThunk('cart/clearCartOnBackend', async () => {
    try {
      await axios.delete(`https://watchnest.onrender.com/api/user/${id}/cart`);
      return id;
    } catch (error) {
      throw error;
    }
  });

   const fetchCartTotal = createAsyncThunk('cart/fetchCartTotal', async () => {
    try {
      if(id){
        const response = await axios.get(`https://watchnest.onrender.com/api/user/${id}/cartTotal`);
        return response.data;
      }
    } catch (error) {
        throw error;
    }
});


  


  const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    status: 'idle',
    error: null,
  };



const cartSlice =  createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
           const itemIndex = state.cartItems.findIndex(item=>item.id===action.payload.id)

           if(itemIndex>=0){
            state.cartItems[itemIndex].cartQuantity+=1
            toast.info(`increased ${state.cartItems[itemIndex].title} quantity`,{
                position:"bottom-left",
            })
           }else{
               const tempProduct = {...action.payload ,cartQuantity:1}
               state.cartItems.push(tempProduct);
               toast.success(`${action.payload.title} added to cart`,{
                position:"bottom-left",
            })
           }
        //    localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
      removeCartItem(state,action){
       const nextCartItems =  state.cartItems.filter(
            cartItem=>cartItem.id!== action.payload.id
        )
        state.cartItems = nextCartItems;
        // localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        toast.error(`${action.payload.title} removed from cart`,{
            position:"bottom-left"
        })
        },
        decreaseCartQuantity(state,action){
            const itemIndex = state.cartItems.findIndex(
                (cartItem)=>cartItem.id === action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity -=1
                toast.warn(`decrease ${state.cartItems[itemIndex].title} quantity by one`,{
                    position:"bottom-left",
                    });
            }else if(state.cartItems[itemIndex].cartQuantity===1){
                const nextCartItems =  state.cartItems.filter(
                    cartItem=>cartItem.id!== action.payload.id
                )
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.title} removed from cart`,{
                    position:"bottom-left"
                })
            }
            // localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        },
        clearCart(state,action){
            state.cartItems=[];
            toast.error(`Cart cleared`,{
                position:"bottom-left"
            })
            // localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        getTotal(state,action){
           let {total,quantity} =  state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity} = cartItem;
                // console.log(cartItem.cartTotalAmount)
                const itemTotal = price * cartQuantity;
                
                cartTotal.total+=itemTotal;
                cartTotal.quantity+=cartQuantity;

                return cartTotal;
            },{
                total:0,
                quantity:0
            })
            state.cartTotalAmount = total;
            state.cartTotalQuantity=quantity;
        }
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCartData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCartData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if (action.payload) {
              state.cartItems = action.payload.cartItems || [];
              state.cartTotalQuantity = action.payload.cartTotalQuantity || 0;
              state.cartTotalAmount = action.payload.cartTotalAmount || 0;
            }
          })
          .addCase(fetchCartData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(removeFromCartOnBackend.fulfilled, (state, action) => {
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
            state.cartItems = nextCartItems;
            toast.error(`${action.payload.product.title} removed from cart`, {
              position: "bottom-left",
            });
          })
            .addCase(decreaseQuantityOnBackend.fulfilled, (state, action) => {
                const itemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
                if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.warn(`Decreased ${state.cartItems[itemIndex].product.title} quantity by one`, {
                    position: "bottom-left",
                });
                } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id);
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.product.title} removed from cart`, {
                    position: "bottom-left",
                });
                }
            })
            .addCase(addToCartOnBackend.fulfilled, (state, action) => {
                const itemIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
                if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].product.title} quantity`, {
                    position: "bottom-left",
                });
                } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {
                    position: "bottom-left",
                });
                }
            })
            .addCase(clearCartOnBackend.fulfilled, (state, action) => {
                state.cartItems = [];
                toast.error(`Cart cleared`, {
                position: "bottom-left",
                });
                
            })
           
      },
})

export const {addToCart,removeCartItem,decreaseCartQuantity,clearCart,getTotal} = cartSlice.actions;
export { fetchCartData,fetchCartTotal, removeFromCartOnBackend, decreaseQuantityOnBackend, addToCartOnBackend, clearCartOnBackend };
export default cartSlice.reducer;