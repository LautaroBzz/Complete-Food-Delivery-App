
import CartContext from "./CartContext";
import React, { useReducer } from "react";

const defaultCartstate = {    // Seteo estado inicial del Cart
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    // Check if the item is already part of the cart. If it is, we get its ID...
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    // Get the existing cart item throught its index
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItemS;
    if (existingCartItem) {   // Check in case is not "null" (the item was already part of the cart)
      const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount};
      updatedItemS = [...state.items];
      updatedItemS[existingCartItemIndex] = updatedItem;
    } else {
      updatedItemS = state.items.concat(action.item);
    };
    return {
      items: updatedItemS,
      totalAmount: updatedTotalAmount,
    };
  };

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItemS;
    if (existingCartItem.amount === 1) {
      updatedItemS = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
      updatedItemS = [...state.items];
      updatedItemS[existingCartItemIndex] = updatedItem;
    };
    return {
      items: updatedItemS,
      totalAmount: updatedTotalAmount,
    };
  };

  return defaultCartstate;  
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartstate);

  const addItemToCartHandler = (item) => {
    dispatch({type: "ADD", item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({type: "REMOVE", id: id});
  };

  const cartContext = {     // setting the concrete context values, updated over time
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler, 
    removeItem: removeItemFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
};
 
export default CartProvider;