
import foodImage from "../../Assets/food.jpg";
import classes from "../../Components/Layout/Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food Delivery</h1>
        <HeaderCartButton onClick={props.onShowCart}/> 
      </header>
      <div className={classes["main-image"]}>
        <img src={foodImage} alt="food image" />
      </div>
    </>
  ) 
};
 
export default Header;