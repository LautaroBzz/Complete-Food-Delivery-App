
import classes from "./FoodItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const FoodItemForm = (props) => {
  const [amountValid, setAmountValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;   // must convert to a number
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountValid(false);
      return;
    };
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input 
          ref={amountInputRef}  // "Ref" previously set on the "Input" component for it to work
          label="Amount" 
          input={{
            id:"amount" + props.id, 
            type:"number", 
            min:"1", 
            max:"5", 
            step:"1", 
            defaultValue:"1"
          }}
        />
        <button type="submit">Add to Cart</button>
        {!amountValid && <p>Please enter a valid amount (1-5)</p>}
      </form>
    </>
  ) 
};

export default FoodItemForm;
