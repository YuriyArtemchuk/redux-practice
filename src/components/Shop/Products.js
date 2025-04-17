import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const products = [
  {
    title: "Супер-Товар 1",
    price: 10,
    description:
      "Благодаря своему высокому качеству, этот товар прослужит вам очень долго.",
  },
  {
    title: "Супер-Товар 2",
    price: 15,
    description:
      "Благодаря своему высокому качеству, этот товар прослужит вам очень долго.",
  },
  {
    title: "Супер-Товар 3",
    price: 5,
    description:
      "Благодаря своему высокому качеству, этот товар прослужит вам очень долго.",
  },
];
const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {products.map((product, index) => (
          <ProductItem
            key={index}
            title={product.title}
            price={product.price}
            description={product.description}
            // product={product}
          />
        ))}
        {/* <ProductItem
          products={products}
          title="Супер-Товар 1"
          price={10}
          description="Благодаря своему высокому качеству, этот товар прослужит вам очень долго."
        /> */}
      </ul>
    </section>
  );
};

export default Products;
