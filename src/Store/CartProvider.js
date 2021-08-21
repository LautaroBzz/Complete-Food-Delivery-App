
import CartContext from "./CartContext";
import React, { useReducer } from "react";

const defaultCartstate = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItemS;
    if (existingCartItem){
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
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartstate);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: "ADD", item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE", id: id});
  };

  const cartContext = {
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