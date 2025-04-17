import { createSlice } from "@reduxjs/toolkit";
import { cartVisibilityActions } from "./index";

const initialCartProductsState = {
  products: [],
  productQuantity: 0,
  isCartContentChanged: false,
};

const cartProductsSlice = createSlice({
  name: "cart",
  initialState: initialCartProductsState,
  reducers: {
    addProductInCart(state, action) {
      const newProduct = action.payload;
      const productExist = state.products.find(
        (product) => product.title === newProduct.title
        // (product) => product.id === newProduct.id
      );
      state.productQuantity++;
      state.isCartContentChanged = true;
      if (productExist) {
        productExist.quantity++;
        productExist.total = productExist.quantity * productExist.price;
      } else {
        state.products.push({
          // id: newProduct.id,
          price: newProduct.price,
          quantity: newProduct.quantity,
          total: newProduct.price,
          title: newProduct.title,
        });
        // state.products = [...state.products, newProduct];
      }
      console.log(action.payload);
      console.log(state.products);
    },
    removeProduct(state, action) {
      const currentTitle = action.payload;
      const existingProduct = state.products.find(
        (product) => product.title === currentTitle
      );
      state.productQuantity--;
      state.isCartContentChanged = true;
      if (existingProduct.quantity === 1) {
        state.products = state.products.filter(
          (product) => product.title !== currentTitle
        );
      } else {
        existingProduct.quantity--;
        existingProduct.total = existingProduct.total - existingProduct.price;
      }
    },

    updatedProductCart(state, action) {
      state.productQuantity = action.payload.productQuantity;
      state.products = action.payload.products;
    },

    increasingQuantity(state, action) {
      const changingProduct = action.payload;
      console.log(changingProduct);
      state.productQuantity++;
      state.isCartContentChanged = true;
      state.products = state.products.map((product) =>
        product.title === action.payload
          ? {
              ...product,
              quantity: product.quantity + 1,
              total: product.price * (product.quantity + 1),
            }
          : product
      );
      console.log(state.products);
    },
    decreasingQuantity(state, action) {
      const existingProductTitle = action.payload;
      const existingProduct = state.products.find(
        (product) => product.title === existingProductTitle
      );

      if (existingProduct.quantity > 1) {
        state.productQuantity--;
        state.isCartContentChanged = true;
        state.products = state.products.map((product) =>
          product.title === action.payload
            ? {
                ...product,
                quantity: product.quantity - 1,
                total: product.price * (product.quantity - 1),
              }
            : product
        );
      }

      console.log(state.products);
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      cartVisibilityActions.showStatusMessage({
        status: "Pending",
        title: "Sending data",
        message: "Cart data is sending ...",
      })
    );

    const sendHttpRequest = async () => {
      const response = await fetch(
        "https://react-my-http-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            products: cartData.products,
            productQuantity: cartData.productQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("A Failure of sending the cart data ");
      }
    };
    try {
      await sendHttpRequest();
      dispatchAction(
        cartVisibilityActions.showStatusMessage({
          status: "success",
          title: "The sending has been successfull",
          message: "Cart data have been sent successfully",
        })
      );
    } catch (error) {
      dispatchAction(
        cartVisibilityActions.showStatusMessage({
          status: "error",
          title: "Sending error",
          message: "Error sending cart data",
        })
      );
    }

    // const responseData = await response.json();
  };
};

export const getCartData = () => {
  return async (dispatchAction) => {
    const getHttpRequest = async () => {
      const response = await fetch(
        "https://react-my-http-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Not possible to fetch the data");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const cartData = await getHttpRequest();
      dispatchAction(
        cartProductsSlice.actions.updatedProductCart({
          products: cartData.products || [],
          productQuantity: cartData.productQuantity,
        })
      );
    } catch {
      dispatchAction(
        cartVisibilityActions.showStatusMessage({
          status: "error",
          title: "Get error",
          message: "Error getting cart data",
        })
      );
    }
  };
};

export const cartProductsSliceActions = cartProductsSlice.actions;
export default cartProductsSlice;
