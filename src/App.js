import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { cartVisibilityActions } from "./components/store/index";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import {
  sendCartData,
  getCartData,
} from "./components/store/cart-products-slice";

let initialRunning = true;

function App() {
  const dispatchAction = useDispatch();

  const cartVisibility = useSelector(
    (state) => state.cartVisibility.isCartVisible
  );
  const cart = useSelector((state) => state.cartProducts);
  const statusMessage = useSelector(
    (state) => state.cartVisibility.statusMessage
  );
  console.log(cart);

  useEffect(() => {
    dispatchAction(getCartData());
  }, []);

  useEffect(() => {
    if (initialRunning) {
      initialRunning = false;
      return;
    }
    if (cart.isCartContentChanged) {
      dispatchAction(sendCartData(cart));
    }
  }, [cart]);

  return (
    <Fragment>
      {statusMessage && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {cartVisibility && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
