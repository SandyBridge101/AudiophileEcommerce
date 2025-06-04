import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  reverse?: boolean;
}

export function ProductCard({ product, reverse = false }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
          reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
        }`}>
          <div>
            <img 
              src={product.categoryImage || product.image} 
              alt={product.name} 
              className="rounded-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            {product.new && (
              <p className="text-orange text-sm tracking-wider uppercase mb-4">New Product</p>
            )}
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-darker">
              {product.name}
            </h2>
            <p className="text-medium-gray text-base leading-relaxed mb-8">
              {product.description}
            </p>
            <Link href={`/product/${product.slug}`}>
              <Button className="bg-orange hover:bg-orange-hover text-white px-8 py-4 text-sm font-medium tracking-wider uppercase">
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
