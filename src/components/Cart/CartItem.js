import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartProductsSliceActions } from "../store/cart-products-slice";

const CartItem = (props) => {
  const { title, quantity, total, price } = props.item;
  console.log(props.item);
  console.log(title, total, quantity, price);
  const dispatchAction = useDispatch();

  const increseHandler = () => {
    dispatchAction(cartProductsSliceActions.increasingQuantity(title));
  };

  const decreseHandler = () => {
    dispatchAction(cartProductsSliceActions.decreasingQuantity(title));
  };

  const removeProductInCartHandler = () => {
    dispatchAction(cartProductsSliceActions.removeProduct(title));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{" "}
          <span className={styles["item-price"]}>
            (${price.toFixed(2)} / шт.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={decreseHandler}>-</button>
          <button onClick={increseHandler}>+</button>
          <button onClick={removeProductInCartHandler}>Удалить</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
