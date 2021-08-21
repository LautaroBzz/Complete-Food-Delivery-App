
import classes from "./FoodItem.module.css";
import FoodItemForm from "./FoodItemForm";
import { useContext } from "react";
import CartContext from "../../../Store/CartContext";

const FoodItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <FoodItemForm id={props.id} onAddToCart={addToCartHandler}/>
        </div>
      </li>
    </>
  )
};
 
export default FoodItem;