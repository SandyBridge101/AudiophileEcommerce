import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/components/Layout";
import type { Product } from "@shared/schema";

interface ProductDetailProps {
  params: {
    slug: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = params;
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }, quantity);
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-darker mb-4">Product not found</h2>
          <p className="text-medium-gray mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-orange hover:bg-orange-hover text-white">
              Go Home
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
          <Link href={`/category/${product.category}`}>
            <button className="text-medium-gray hover:text-orange transition-colors duration-300 mb-12 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Link>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="rounded-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              {product.new && (
                <p className="text-orange text-sm tracking-wider uppercase mb-4">New Product</p>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-darker">
                {product.name}
              </h1>
              <p className="text-medium-gray text-base leading-relaxed mb-8">
                {product.description}
              </p>
              <p className="text-2xl font-bold mb-8 text-darker">
                $ {product.price.toLocaleString()}
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4 bg-light-gray px-4 py-3 rounded">
                  <button 
                    className="text-medium-gray hover:text-orange font-bold transition-colors duration-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-darker">{quantity}</span>
                  <button 
                    className="text-medium-gray hover:text-orange font-bold transition-colors duration-300"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button 
                  className="bg-orange hover:bg-orange-hover text-white px-8 py-4 text-sm font-medium tracking-wider uppercase"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Features and In the Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-darker">Features</h2>
              <div className="text-medium-gray leading-relaxed whitespace-pre-line">
                {product.features}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-darker">In the Box</h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-orange font-bold mr-6">{item.quantity}x</span>
                    <span className="text-medium-gray">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery */}
          {product.gallery && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
              <div className="space-y-6">
                <img 
                  src={product.gallery.first} 
                  alt={`${product.name} gallery 1`} 
                  className="rounded-lg w-full h-64 object-cover"
                />
                <img 
                  src={product.gallery.second} 
                  alt={`${product.name} gallery 2`} 
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
              <div className="lg:col-span-2">
                <img 
                  src={product.gallery.third} 
                  alt={`${product.name} gallery 3`} 
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* You May Also Like */}
          {product.others && product.others.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-12 text-center uppercase tracking-wider text-darker">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.others.map((item) => (
                  <Card key={item.slug} className="text-center border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="rounded-lg w-full h-64 object-cover mb-8"
                      />
                      <h3 className="text-xl font-bold mb-8 text-darker">{item.name}</h3>
                      <Link href={`/product/${item.slug}`}>
                        <Button className="bg-orange hover:bg-orange-hover text-white px-8 py-3 text-sm font-medium tracking-wider uppercase">
                          See Product
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
