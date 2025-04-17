import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { cartProductsSliceActions } from "../store/cart-products-slice";
import { useDispatch, useSelector } from "react-redux";

const ProductItem = (props) => {
  const { title, price, description } = props;
  // const cartProducts = useSelector((state) => state.cartProducts);
  const dispatchAction = useDispatch();

  const addProductInCartHandler = () => {
    // const updatedProductsQuantity = cartProducts.productQuantity + 1;
    // const updatedProducts = cartProducts.products.slice();
    // console.log(updatedProductsQuantity);
    // console.log(updatedProducts);
    // const existingProduct = updatedProducts.find(
    //   (product) => product.title === title
    // );
    // console.log(existingProduct);
    // if (existingProduct) {
    //   const updatedExistingProduct = { ...existingProduct };
    //   updatedExistingProduct.quantity++;
    //   updatedExistingProduct.total = updatedExistingProduct.total + price;
    //   console.log(updatedExistingProduct);
    //   const indexExistingProduct = updatedProducts.findIndex(
    //     (item) => item.title === title
    //   );
    //   updatedProducts[indexExistingProduct] = updatedExistingProduct;
    // } else {
    //   updatedProducts.push({
    //     title: title,
    //     price: price,
    //     quantity: 1,
    //     total: price,
    //   });
    // }
    // const updatedCartProducts = {
    //   products: updatedProducts,
    //   productQuantity: updatedProductsQuantity,
    // };
    // dispatchAction(
    //   cartProductsSliceActions.updatedProductCart(updatedCartProducts)
    // );
    //
    dispatchAction(
      cartProductsSliceActions.addProductInCart({
        title: title,
        price: price,
        quantity: 1,
        description: description,
        total: price,
      })
    );
  };

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addProductInCartHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
