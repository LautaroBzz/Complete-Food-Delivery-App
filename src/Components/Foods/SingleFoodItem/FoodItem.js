
import classes from "./FoodItem.module.css";
import FoodItemForm from "./FoodItemForm";
import { useContext } from "react";
import CartContext from "../../../Store/CartContext";

const FoodItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({     // expects "item" as parameter and must be an object with this properties:
      id: props.id,       // same as the original dummy array "TEMPLATE_MEALS" at the Available component
      name: props.name,
      amount: amount,     // We only need the amount from the "FoodItemForm", the rest is added by props
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