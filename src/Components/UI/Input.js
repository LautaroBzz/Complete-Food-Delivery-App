
import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {  // Set so the Ref works on this custom component
  return (
    <>
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>
      </div>
    </>
  )
});

export default Input;
