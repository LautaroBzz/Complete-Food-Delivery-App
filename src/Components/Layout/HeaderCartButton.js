
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/CartContext";

const HeaderCartButton = (props) => {
  const [buttonIsLit, setButtonIsLit] = useState(false);

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const totalNumberOfItems = items.reduce((actualNumber, item) => {
    return actualNumber + item.amount;
  }, 0);

  const buttonclasses = `${classes.button} ${buttonIsLit ? classes.bump : ""}`;

  useEffect(() => {
    if(items.length === 0){
      return;
    };

    setButtonIsLit(true);

    const timer = setTimeout(() => {
      setButtonIsLit(false);
    }, 300);

    return () => {clearTimeout(timer)};
  }, [items]);

  return ( 
    <>
      <button className={buttonclasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalNumberOfItems}</span>
      </button>
    </>
  )
};
 
export default HeaderCartButton;