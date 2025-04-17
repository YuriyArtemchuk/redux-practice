import { cartVisibilityActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatchAction = useDispatch();
  const quantityProductsInCart = useSelector(
    (state) => state.cartProducts.productQuantity
  );
  // const productsInCart = useSelector((state) => state.cartProducts.products);
  // const quantityProductsInCart = productsInCart.reduce(
  //   (acc, curr) => curr.quantity + acc,
  //   0
  // );
  console.log(quantityProductsInCart);

  const cartVisibilityHandle = () => {
    dispatchAction(cartVisibilityActions.setCartVisibility());
  };

  return (
    <button onClick={cartVisibilityHandle} className={styles.button}>
      <span>Корзина</span>
      <span className={styles.badge}>{quantityProductsInCart}</span>
    </button>
  );
};

export default CartButton;
