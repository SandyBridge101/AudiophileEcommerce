import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [
    {
      name: "Headphones",
      href: "/category/headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      name: "Speakers", 
      href: "/category/speakers",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      name: "Earphones",
      href: "/category/earphones", 
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    }
  ];

  const featuredProduct = products?.find(p => p.slug === "xx99-mark-two-headphones");
  const zx9Speaker = products?.find(p => p.slug === "zx9-speaker");
  const zx7Speaker = products?.find(p => p.slug === "zx7-speaker");
  const yx1Earphones = products?.find(p => p.slug === "yx1-earphones");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-darker">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-medium-gray text-sm tracking-wider uppercase mb-4">New Product</p>
              <h1 className="text-white text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                XX99 Mark II<br />Headphones
              </h1>
              <p className="text-medium-gray text-base lg:text-lg mb-8 leading-relaxed max-w-md">
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </p>
              {featuredProduct && (
                <Link href={`/product/${featuredProduct.slug}`}>
                  <Button className="bg-orange hover:bg-orange-hover text-white px-8 py-4 text-sm font-medium tracking-wider uppercase">
                    See Product
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="XX99 Mark II Headphones" 
                className="w-80 h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="text-center group cursor-pointer hover:shadow-lg transition-shadow duration-300 border-0 bg-light-gray">
                  <CardContent className="py-16 px-8">
                    <img 
                      src={category.image} 
                      alt={`Premium ${category.name}`} 
                      className="w-48 h-32 object-contain mx-auto mb-6"
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

      {/* Featured Products */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* ZX9 Speaker Feature */}
          {zx9Speaker && (
            <div className="bg-orange rounded-lg overflow-hidden mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12 lg:p-24">
                <div className="flex justify-center lg:justify-start">
                  <img 
                    src={zx9Speaker.image} 
                    alt="ZX9 Speaker" 
                    className="w-64 h-80 object-contain"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    ZX9<br />Speaker
                  </h2>
                  <p className="text-white text-base lg:text-lg mb-8 leading-relaxed max-w-md opacity-90">
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                  </p>
                  <Link href={`/product/${zx9Speaker.slug}`}>
                    <Button className="bg-darker hover:bg-gray-800 text-white px-8 py-4 text-sm font-medium tracking-wider uppercase">
                      See Product
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ZX7 Speaker Feature */}
          {zx7Speaker && (
            <div className="bg-light-gray rounded-lg overflow-hidden mb-12 relative">
              <div 
                className="flex items-center justify-between p-12 lg:p-16 min-h-[320px]"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'right',
                  backgroundBlendMode: 'overlay'
                }}
              >
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6 text-darker">ZX7 Speaker</h3>
                  <Link href={`/product/${zx7Speaker.slug}`}>
                    <Button 
                      variant="outline" 
                      className="border-2 border-darker hover:bg-darker hover:text-white px-8 py-3 text-sm font-medium tracking-wider uppercase text-darker"
                    >
                      See Product
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* YX1 Earphones Feature */}
          {yx1Earphones && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-light-gray rounded-lg overflow-hidden">
                <img 
                  src={yx1Earphones.image} 
                  alt="YX1 Earphones" 
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="bg-light-gray rounded-lg p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-8 text-darker">YX1 Earphones</h3>
                <Link href={`/product/${yx1Earphones.slug}`}>
                  <Button 
                    variant="outline"
                    className="border-2 border-darker hover:bg-darker hover:text-white px-8 py-3 text-sm font-medium tracking-wider uppercase self-start text-darker"
                  >
                    See Product
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight text-darker">
                Bringing you the <span className="text-orange">best</span> audio gear
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
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600" 
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
