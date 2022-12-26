import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enterdName = nameInput.current.value;
    const enterdStreet = streetInput.current.value;
    const enterdPostalCode = postalCodeInput.current.value;
    const enterdCity = cityInput.current.value;

    const enterdNameIsValid = !isEmpty(enterdName);
    const enterdStreetIsValid = !isEmpty(enterdStreet);
    const enterdCityIsValid = !isEmpty(enterdCity);
    const enterdPostalIsValid = isFiveChars(enterdPostalCode);

    setFormInputsValidity({
      name: enterdNameIsValid,
      street: enterdStreetIsValid,
      city: enterdCityIsValid,
      postalCode: enterdPostalIsValid,
    });

    const formIsValid =
      enterdNameIsValid &&
      enterdStreetIsValid &&
      enterdPostalIsValid &&
      enterdCityIsValid;

    if (!formIsValid) {
      return;
    }
    //submit the cart data
    props.onConfirm({
      name: enterdName,
      street: enterdCity,
      city: enterdCity,
      postalCode: enterdPostalCode,
    });
  };
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInput} type="text" id="name" />
        {!formInputsValidity.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!formInputsValidity.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInput} type="text" id="postal" />
        {!formInputsValidity.postalCode && (
          <p>Please Enter a Valid Postal Code (five characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!formInputsValidity.city && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
