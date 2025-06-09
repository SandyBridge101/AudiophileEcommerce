import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

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

  const categories = [
    {
      name: "Headphones",
      href: "/category/headphones",
      image: "/assets/product-xx99-mark-one-headphones/desktop/image-product.jpg"
    },
    {
      name: "Speakers", 
      href: "/category/speakers",
      image: "/assets/product-zx9-speaker/desktop/image-product.jpg"
    },
    {
      name: "Earphones",
      href: "/category/earphones", 
      image: "/assets/product-yx1-earphones/desktop/image-product.jpg"
    }
  ];

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

            {/* Category Navigation */}
            <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="text-center group cursor-pointer hover:shadow-lg transition-shadow duration-300 border-0 bg-light-gray h-30">
                  <CardContent className="py-16 px-8">
                    <img 
                      src={category.image} 
                      alt={`Premium ${category.name}`} 
                      className="w-40 h-60 object-contain mx-auto mb-6"
                      style={{
                        position: "relative",
                        background:"transparent",
                

                      }}
                    />
                    <h3 className="text-xl font-bold mb-4 tracking-wider uppercase text-darker">
                      {category.name}
                    </h3>
                    <p className="text-medium-gray text-sm font-medium tracking-wider uppercase group-hover:text-orange transition-colors duration-300">
                      Shop <span className="ml-2 text-orange">›</span>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight text-darker">
                BRINGING YOU THE <span className="text-orange">BEST</span> AUDIO GEAR
              </h2>
              <p className="text-medium-gray text-base leading-relaxed mb-6">
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
                earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
                rooms available for you to browse and experience a wide range of our products.
              </p>
              <p className="text-medium-gray text-base leading-relaxed">
                Stop by our store to meet some of the fantastic people who make Audiophile the best place to 
                buy your portable audio equipment.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="/assets/shared/desktop/image-best-gear.jpg" 
                alt="Person enjoying premium audio" 
                className="rounded-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
