
import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === "";
const wrongPostalCode = value => value.trim().length !== 4;
const wrongPhoneNumber = value => value.trim().length < 8;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    phoneNumber: true,
    details: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const detailsInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredDetails = detailsInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPCValid = !wrongPostalCode(enteredPostalCode);
    const enteredDetailsValid = !isEmpty(enteredDetails);
    const enteredPhoneNumberValid = !wrongPhoneNumber(enteredPhoneNumber);

    setFormInputsValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      postalCode: enteredPCValid,
      details: enteredDetailsValid,
      phoneNumber: enteredPhoneNumberValid
    });

    const formIsValid = 
      enteredNameValid && 
      enteredStreetValid && 
      enteredPCValid && 
      enteredDetailsValid &&
      enteredPhoneNumberValid;

    if (!formIsValid) {
      return;
    };

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      details: enteredDetails,
      phoneNumber: enteredPhoneNumber
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.phoneNumber ? "" : classes.invalid}`}>
        <label htmlFor='phone'>Phone Number</label>
        <input type='number' id='phone' ref={phoneNumberInputRef}/>
        {!formInputsValidity.phoneNumber && <p>Please enter a valid phone number!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.details ? "" : classes.invalid}`}>
        <label htmlFor='details'>Details for us to know</label>
        <input type='text' id='details' ref={detailsInputRef}/>
        {!formInputsValidity.details && <p>Anything in particular to specify?</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;