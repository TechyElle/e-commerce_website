import  { createContext, useContext, useEffect,  useState, ReactNode } from 'react';


export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stock?: number;
  isNew?: boolean;
  isSale?: boolean;
  originalPrice?: number;
  saleStock?: number;
  specs?: { [key: string]: string };
}


export interface CartItem extends Product {
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);


const CART_LS_KEY = 'cart';


function safeParseCart(raw: string): CartItem[] {
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];


  // Minimal validation & normalization
  return parsed
    .map((x) => {
      if (!x || typeof x !== 'object') return null;
      const quantity = Number((x as any).quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) return null;


      const item = x as CartItem;
      return {
        ...item,
        quantity: Math.floor(quantity),
      };
    })
    .filter(Boolean) as CartItem[];
}


function loadCartFromLocalStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_LS_KEY);
    if (!raw) return [];
    return safeParseCart(raw);
  } catch {
    return [];
  }
}


function saveCartToLocalStorage(cart: CartItem[]) {
  try {
    window.localStorage.setItem(CART_LS_KEY, JSON.stringify(cart));
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}


function normalizeQuantityForItem(quantity: number, item: CartItem) {
  const next = Math.floor(Number(quantity));
  if (!Number.isFinite(next) || next <= 0) return 0;


  const maxStock = typeof item.stock === 'number' ? item.stock : null;
  if (typeof maxStock === 'number') return Math.min(next, Math.max(0, maxStock));
  return next;
}


export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage first
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadCartFromLocalStorage();
  });


  const addToCart = (product: Product) => {
    if (!product.inStock || (typeof product.stock === 'number' && product.stock <= 0)) {
      return;
    }




    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const nextQty = normalizeQuantityForItem(existingItem.quantity + 1, {
          ...existingItem,
          stock: product.stock,
        });
        if (nextQty <= 0) return prevCart;
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, ...product, quantity: nextQty }
            : item
        );
      }


      const initialQty = normalizeQuantityForItem(1, {
        ...(product as any),
        quantity: 1,
      });
      if (initialQty <= 0) return prevCart;
      return [...prevCart, { ...product, quantity: initialQty }];
    });
  };


  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };


  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (!item) return prevCart;


      const nextQty = normalizeQuantityForItem(quantity, item);
      if (nextQty <= 0) return prevCart.filter((i) => i.id !== productId);


      return prevCart.map((i) => (i.id === productId ? { ...i, quantity: nextQty } : i));
    });
  };


  const clearCart = () => {
    setCart([]);
  };


  // Persist cart after every change
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);






  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}