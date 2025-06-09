import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CartItem } from "@/lib/types";
import { getCartFromStorage, saveCartToStorage, clearCartFromStorage, getCartItemCount } from "@/lib/cart";
import { Cart } from "./Cart";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCartItems(current => {
      const existingItem = current.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return current.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...current, { ...item, quantity }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(current => current.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    clearCartFromStorage();
  };

  const itemCount = getCartItemCount(cartItems);

  const cartContextValue: CartContextType = {
    items: cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount,
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Headphones", href: "/category/headphones" },
    { name: "Speakers", href: "/category/speakers" },
    { name: "Earphones", href: "/category/earphones" },
  ];

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="min-h-screen bg-off-white">
        {/* Navigation */}
        <nav className="bg-darker border-b border-white border-opacity-20 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <button 
                className="lg:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="flex items-center space-x-16">
                <Link href="/">
                  <h1 className="text-white text-2xl font-bold tracking-wider cursor-pointer">audiophile</h1>
                </Link>
                <div className="hidden lg:flex space-x-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className={`text-white hover:text-orange transition-colors duration-300 text-sm font-medium tracking-wider uppercase ${
                        location === item.href ? 'text-orange' : ''
                      }`}>
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              
              <button 
                className="text-white hover:text-orange transition-colors duration-300 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-8 pb-4">
                <div className="space-y-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a 
                        className={`block text-white hover:text-orange transition-colors duration-300 text-sm font-medium tracking-wider uppercase ${
                          location === item.href ? 'text-orange' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {children}
        </main>
        

        {/* Footer */}
        <footer className="bg-darker">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-white text-2xl font-bold tracking-wider mb-8">audiophile</h3>
                <p className="text-medium-gray leading-relaxed max-w-md">
                  Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
                  and sound specialists who are devoted to helping you get the most out of personal audio.
                </p>
              </div>
              <div>
                <div className="space-y-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="block text-white hover:text-orange transition-colors duration-300 text-sm font-medium tracking-wider uppercase">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-orange transition-colors duration-300">
                    <img src="/assets/shared/desktop/icon-facebook.svg" alt="Instagram" className="w-6 h-6"></img>
                  </a>
                  <a href="#" className="text-white hover:text-orange transition-colors duration-300">
                  <img src="/assets/shared/desktop/icon-twitter.svg" alt="Instagram" className="w-6 h-6"></img>
                  </a>
                  <a href="#" className="text-white hover:text-orange transition-colors duration-300">
                  <img src="/assets/shared/desktop/icon-instagram.svg" alt="Instagram" className="w-6 h-6"></img>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white border-opacity-20 pt-8 mt-12">
              <p className="text-medium-gray text-sm">Copyright 2021. All Rights Reserved</p>
            </div>
          </div>
        </footer>

        {/* Cart Sidebar */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {/* Cart Overlay */}
        {isCartOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
        )}
      </div>
    </CartContext.Provider>
  );
}
