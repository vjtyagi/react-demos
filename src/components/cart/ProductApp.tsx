import { MouseEventHandler, useMemo, useState } from "react";
import "./productapp.css";
import { products, ProductType } from "./data";
export interface CartProductType extends ProductType {
  quantity: number;
}

export default function ProductApp() {
  const [showCart, setShowCart] = useState(false);
  const [showProductsList, setShowProductsList] = useState(true);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const cartProductIds: Set<number> = useMemo(() => {
    return new Set(cartProducts.map((prod) => prod.id));
  }, [cartProducts]);

  const handleViewCart = () => {
    setShowCart(true);
  };
  const handleShowProducts = () => {
    setShowCart(false);
  };
  const handleAddToCart = (product: ProductType) => {
    setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
  };
  const handleIncrementQuantity = (product: CartProductType) => {
    setCartProducts(
      cartProducts.map((prod) => {
        if (prod.id == product.id) {
          return { ...prod, quantity: prod.quantity + 1 };
        } else {
          return prod;
        }
      })
    );
  };
  const handleDecrementQuantity = (product: CartProductType) => {
    setCartProducts(
      cartProducts.map((prod) => {
        if (prod.id == product.id) {
          return { ...prod, quantity: prod.quantity - 1 };
        } else {
          return prod;
        }
      })
    );
  };
  console.log("cartProducts", cartProducts);
  return (
    <div className="product-app">
      {!showCart && <button onClick={handleViewCart}>View Cart</button>}
      {!showCart && (
        <ProductList
          data={products}
          onAddToCart={handleAddToCart}
          cartProductIds={cartProductIds}
          onViewCart={handleViewCart}
        />
      )}
      {showCart && (
        <Cart
          onShowProducts={handleShowProducts}
          products={cartProducts}
          onIncrement={handleIncrementQuantity}
          onDecrement={handleDecrementQuantity}
        />
      )}
    </div>
  );
}

function ProductList({
  data,
  onAddToCart,
  cartProductIds,
  onViewCart,
}: {
  data: ProductType[];
  cartProductIds: Set<number>;
  onAddToCart: Function;
  onViewCart: Function;
}) {
  return (
    <div className="product-list">
      {data.map((product) => (
        <Product
          onViewCart={onViewCart}
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          isAddedToCart={cartProductIds.has(product.id)}
        />
      ))}
    </div>
  );
}
function Product({
  product,
  onAddToCart,
  isAddedToCart,
  onViewCart,
}: {
  product: ProductType;
  onAddToCart: Function;
  isAddedToCart: boolean;
  onViewCart: Function;
}) {
  const handleAddToCart = (e) => {
    onAddToCart && onAddToCart(product);
  };
  const handleViewCart = (e) => {
    onViewCart && onViewCart();
  };

  return (
    <div className="product">
      <div className="product__image">
        <img src={product.imageUrl} />
      </div>
      <div className="product__details">
        <div className="product__info">
          <div className="product__name product__row">{product.name}</div>
          <div className="product__price product__row">
            Price: ${product.price}
          </div>
        </div>
        {!isAddedToCart && (
          <button className="btn product__action" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
        {isAddedToCart && (
          <button className="btn product__action" onClick={handleViewCart}>
            Go to Cart
          </button>
        )}
      </div>
    </div>
  );
}

function Cart({
  products,
  onShowProducts,
  onIncrement,
  onDecrement,
}: {
  products: CartProductType[];
  onShowProducts: MouseEventHandler<HTMLButtonElement>;
  onIncrement: Function;
  onDecrement: Function;
}) {
  const subTotal = useMemo(() => {
    return products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }, [products]);
  const tax = useMemo(() => (subTotal * 0.1).toFixed(2), [subTotal]);
  const grandTotal = useMemo(() => subTotal + parseFloat(tax), [subTotal, tax]);
  return (
    <div className="cart">
      <button style={{ alignSelf: "flex-start" }} onClick={onShowProducts}>
        Show Products
      </button>
      <header>Your Cart ({products.length} items)</header>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <CartProductRow
              key={prod.id}
              product={prod}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </tbody>
      </table>
      <div className="bill">
        <div className="bill-row sub-total">
          <label>Subtotal: </label>
          <div>${subTotal}</div>
        </div>
        <div className="bill-row sales-tax">
          <label>Tax: </label>
          <div>${tax}</div>
        </div>
        <div className="bill-row grand-total">
          <label>Grand Total: </label>
          <div>${grandTotal}</div>
        </div>
        <button style={{ alignSelf: "flex-end" }}>Check out</button>
      </div>
    </div>
  );
}
function CartProductRow({
  product,
  onIncrement,
  onDecrement,
}: {
  product: CartProductType;
  onIncrement: Function;
  onDecrement: Function;
}) {
  const handleIncrement = () => {
    onIncrement && onIncrement(product);
  };
  const handleDecrement = () => {
    onDecrement && onDecrement(product);
  };
  return (
    <tr className="cart-product-row">
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <div className="cart-quantity-actions">
          <button onClick={handleDecrement}>-</button>
          {product.quantity}
          <button onClick={handleIncrement}>+</button>
        </div>
      </td>
      <td>${product.quantity * product.price}</td>
    </tr>
  );
}
