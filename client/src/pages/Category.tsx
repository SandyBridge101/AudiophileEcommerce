import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";

interface CategoryProps {
  params: {
    category: string;
  };
}

export default function Category({ params }: CategoryProps) {
  const { category } = params;
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${category}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-darker mb-4">No products found</h2>
          <p className="text-medium-gray">No products are available in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-darker py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-white text-4xl font-bold tracking-wider uppercase">
            {category}
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-32">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
