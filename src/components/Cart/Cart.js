import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartProducts = useSelector((state) => state.cartProducts.products);
  console.log(cartProducts);
  return (
    <Card className={styles.cart}>
      <h2>Мои Покупки</h2>
      <ul>
        {cartProducts.map((product, index) => (
          <CartItem
            key={index}
            item={{
              title: product.title,
              quantity: product.quantity,
              price: product.price,
              total: product.total,
            }}
          />
        ))}
        {/* <CartItem
        item={{ title: "Супер-Товар", quantity: 2, total: 14, price: 7 }}
        /> */}
      </ul>
    </Card>
  );
};

export default Cart;
