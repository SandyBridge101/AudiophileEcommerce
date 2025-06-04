export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: 'emoney' | 'cash';
  emoneyNumber?: string;
  emoneyPin?: string;
}
