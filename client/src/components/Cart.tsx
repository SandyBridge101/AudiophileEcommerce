import { Link } from "wouter";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./Layout";
import { calculateCartTotals } from "@/lib/cart";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, updateQuantity, clearCart } = useCart();
  const totals = calculateCartTotals(items);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider text-darker">
            Cart ({items.length})
          </h2>
          <div className="flex items-center space-x-4">
            {items.length > 0 && (
              <button 
                className="text-medium-gray hover:text-orange transition-colors duration-300 text-sm"
                onClick={clearCart}
              >
                Remove all
              </button>
            )}
            <button
              className="text-medium-gray hover:text-orange transition-colors duration-300"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-medium-gray mb-8">Your cart is empty</p>
            <Button 
              onClick={onClose}
              className="bg-orange hover:bg-orange-hover text-white px-8 py-3"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-darker">{item.name}</h4>
                    <p className="text-medium-gray text-sm">$ {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-light-gray px-3 py-2 rounded">
                    <button 
                      className="text-medium-gray hover:text-orange transition-colors duration-300"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-medium text-darker">{item.quantity}</span>
                    <button 
                      className="text-medium-gray hover:text-orange transition-colors duration-300"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-8">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-darker">Total</span>
                <span className="text-darker">$ {totals.subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link href="/checkout">
                <Button 
                  className="w-full bg-orange hover:bg-orange-hover text-white py-4 text-sm font-medium tracking-wider uppercase"
                  onClick={onClose}
                >
                  Checkout
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 text-darker py-4 text-sm font-medium tracking-wider uppercase"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
