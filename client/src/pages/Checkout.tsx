import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCart } from "@/components/Layout";
import { calculateCartTotals } from "@/lib/cart";
import { apiRequest } from "@/lib/queryClient";
import type { CheckoutFormData } from "@/lib/types";

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(1, "ZIP code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  paymentMethod: z.enum(["emoney", "cash"]),
  emoneyNumber: z.string().optional(),
  emoneyPin: z.string().optional(),
});

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const totals = calculateCartTotals(items);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      paymentMethod: "emoney",
      emoneyNumber: "",
      emoneyPin: "",
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        zip: data.zip,
        city: data.city,
        country: data.country,
        paymentMethod: data.paymentMethod,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        vat: totals.vat,
        grandTotal: totals.grandTotal,
      };

      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      setOrderId(order.id);
      setShowConfirmation(true);
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    createOrderMutation.mutate(data);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    clearCart();
    window.location.href = "/";
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-darker mb-4">Your cart is empty</h2>
          <p className="text-medium-gray mb-8">Add some products to your cart before checkout.</p>
          <Link href="/">
            <Button className="bg-orange hover:bg-orange-hover text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/">
            <button className="text-medium-gray hover:text-orange transition-colors duration-300 mb-12 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-12 text-darker">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                      <h2 className="text-xl font-bold mb-8 text-orange uppercase tracking-wider">
                        Billing Details
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Alexei Ward"
                            {...form.register("name")}
                            className="mt-2"
                          />
                          {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="alexei@mail.com"
                            {...form.register("email")}
                            className="mt-2"
                          />
                          {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 202-555-0136"
                          {...form.register("phone")}
                          className="mt-2"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-8 text-orange uppercase tracking-wider">
                        Shipping Info
                      </h3>
                      
                      <div className="mb-6">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="1137 Williams Avenue"
                          {...form.register("address")}
                          className="mt-2"
                        />
                        {form.formState.errors.address && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input
                            id="zip"
                            placeholder="10001"
                            {...form.register("zip")}
                            className="mt-2"
                          />
                          {form.formState.errors.zip && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.zip.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            {...form.register("city")}
                            className="mt-2"
                          />
                          {form.formState.errors.city && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.city.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="United States"
                          {...form.register("country")}
                          className="mt-2"
                        />
                        {form.formState.errors.country && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.country.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-8 text-orange uppercase tracking-wider">
                        Payment Details
                      </h3>
                      
                      <div className="mb-6">
                        <Label className="text-sm font-medium">Payment Method</Label>
                        <RadioGroup
                          value={form.watch("paymentMethod")}
                          onValueChange={(value) => form.setValue("paymentMethod", value as "emoney" | "cash")}
                          className="mt-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="emoney" id="emoney" />
                            <Label htmlFor="emoney">e-Money</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash">Cash on Delivery</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {form.watch("paymentMethod") === "emoney" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="emoneyNumber">e-Money Number</Label>
                            <Input
                              id="emoneyNumber"
                              placeholder="238521993"
                              {...form.register("emoneyNumber")}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="emoneyPin">e-Money PIN</Label>
                            <Input
                              id="emoneyPin"
                              placeholder="6891"
                              {...form.register("emoneyPin")}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      )}
                      
                      {form.watch("paymentMethod") === "cash" && (
                        <div className="bg-light-gray p-6 rounded-lg">
                          <p className="text-medium-gray text-sm">
                            The 'Cash on Delivery' option enables you to pay in cash when our delivery courier 
                            arrives at your residence. Just make sure your address is correct so that your order 
                            will not be cancelled.
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-8 uppercase tracking-wider text-darker">Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-sm text-darker">{item.name}</h4>
                            <p className="text-medium-gray text-sm">$ {item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <span className="font-medium text-darker">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-medium-gray">Total</span>
                      <span className="font-bold text-darker">$ {totals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-medium-gray">Shipping</span>
                      <span className="font-bold text-darker">$ {totals.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-medium-gray">VAT (Included)</span>
                      <span className="font-bold text-darker">$ {totals.vat.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold mb-8">
                    <span className="text-darker">Grand Total</span>
                    <span className="text-orange">$ {totals.grandTotal.toLocaleString()}</span>
                  </div>
                  
                  <Button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-orange hover:bg-orange-hover text-white py-4 text-sm font-medium tracking-wider uppercase"
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={createOrderMutation.isPending}
                  >
                    {createOrderMutation.isPending ? "Processing..." : "Continue & Pay"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Order Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={handleConfirmationClose}>
        <DialogContent className="max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-darker">
              Thank you<br />for your order
            </h2>
            <p className="text-medium-gray mb-8">You will receive an email confirmation shortly.</p>
            
            <div className="rounded-lg overflow-hidden mb-8">
              <div className="flex">
                {/* Left side - Product info */}
                <div className="bg-light-gray p-6 flex-1">
                  {items.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src={items[0].image} 
                          alt={items[0].name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-darker text-sm mb-1">{items[0].name}</h4>
                          <p className="text-medium-gray text-sm font-bold">$ {items[0].price.toLocaleString()}</p>
                        </div>
                        <span className="font-bold text-medium-gray text-sm">x{items[0].quantity}</span>
                      </div>
                      {items.length > 1 && (
                        <div className="border-t border-gray-300 pt-3">
                          <p className="text-medium-gray text-sm font-bold">and {items.length - 1} other item(s)</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Right side - Grand total */}
                <div className="bg-darker p-6 flex-1 flex flex-col justify-center">
                  <p className="text-white opacity-50 text-sm mb-2 uppercase tracking-wider">Grand Total</p>
                  <p className="text-white text-lg font-bold">$ {totals.grandTotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <Button 
              className="w-full bg-orange hover:bg-orange-hover text-white py-4 text-sm font-medium tracking-wider uppercase"
              onClick={handleConfirmationClose}
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
