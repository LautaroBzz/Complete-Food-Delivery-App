
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const isThereAnyItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1});
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  // Used a Firebase backend to GET and POST fetchs
  const submitOrderHandler = async (userData) => {
    setSubmitting(true);
    await fetch("https://food-app-6818d-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = 
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem 
          key={item.id}
          name={item.name} 
          amount={item.amount} 
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>;

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Your Total</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && <Checkout onClose={props.onClose} onConfirm={submitOrderHandler}/>}
      <div className={classes.actions}>
        {!checkout && 
          <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>}
        {isThereAnyItems && !checkout && 
          <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
    </>
  );

  return (
    <>  
      <Modal onClose={props.onClose}>
        {!submitting && !didSubmit && cartModalContent}
        {submitting && <p>Sending your order...</p>}
        {didSubmit && (
          <>
            <h3>We got your order! We'll be there soon.</h3>
            <p>We will be calling you in case of any delay...</p>
            <div className={classes.actions}>
              <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
          </>
        )}
      </Modal>  
    </>
  );
}
 
export default Cart;