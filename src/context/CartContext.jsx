import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const createCartItemId = () =>
  `cart-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const normalizeCartItem = (item) => ({
  ...item,
  cartItemId: item.cartItemId || createCartItemId(),
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedCart = window.localStorage.getItem("aipl-cart");
    return savedCart ? JSON.parse(savedCart).map(normalizeCartItem) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("aipl-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id && !item.buildGroupId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartItemId === existingItem.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, normalizeCartItem({ ...product, quantity: 1 })];
    });
  };

  const addBuildToCart = (build) => {
    const buildGroupId = `build-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const buildItems = build.items.map((item) =>
      normalizeCartItem({
        ...item,
        quantity: 1,
        buildGroupId,
        buildGroupName: build.name,
      })
    );

    setCartItems((currentItems) => [...currentItems, ...buildItems]);
  };

  const decreaseQuantity = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQuantity = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      addToCart,
      addBuildToCart,
      cartItems,
      clearCart,
      decreaseQuantity,
      increaseQuantity,
      removeFromCart,
      totalItems,
      totalPrice,
    }),
    [cartItems, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
