import { type Product, type Order, type User, type InsertOrder, type InsertUser } from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product> = new Map();
  private orders: Map<number, Order> = new Map();
  private users: Map<number, User> = new Map();
  private currentOrderId = 1;
  private currentUserId = 1;

  constructor() {
    this.initializeProducts();
  }

  private initializeProducts() {
    const products = [
      {
        id: 1,
        slug: "yx1-earphones",
        name: "YX1 Wireless Earphones",
        category: "earphones",
        new: true,
        price: 599,
        description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
        features: "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.",
        includes: [
          { quantity: 2, item: "Earphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "/assets/product-yx1-earphones/desktop/image-product.jpg",
        categoryImage: "/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg",
        gallery: {
          first: "/assets/product-yx1-earphones/desktop/image-gallery-1.jpg",
          second: "/assets/product-yx1-earphones/desktop/image-gallery-2.jpg",
          third: "/assets/product-yx1-earphones/desktop/image-gallery-3.jpg"
        },
        others: [
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 Mark I",
            image: "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
            
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/assets/shared/desktop/image-xx59-headphones.jpg"
            
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            image: "/assets/shared/desktop/image-zx9-speaker.jpg"
            
          }
        ]
      },
      {
        id: 2,
        slug: "xx59-headphones",
        name: "XX59 Headphones",
        category: "headphones",
        new: false,
        price: 899,
        description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
        features: "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.\n\nMore than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "/assets/product-xx59-headphones/desktop/image-product.jpg",
        categoryImage: "/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg",
        gallery: {
          first: "/assets/product-xx59-headphones/desktop/image-gallery-1.jpg",
          second: "/assets/product-xx59-headphones/desktop/image-gallery-2.jpg",
          third: "/assets/product-xx59-headphones/desktop/image-gallery-3.jpg"
        },
        others: [
          {
            slug: "xx99-mark-two-headphones",
            name: "XX99 Mark II",
            image: "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg"
            
          },
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 Mark I",
            image: "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
            
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            image: "/assets/shared/desktop/image-zx9-speaker.jpg"
            
          }
        ]
      },
      {
        id: 3,
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I Headphones",
        category: "headphones",
        new: false,
        price: 1750,
        description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
        features: "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.\n\nFrom the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is includes with a balanced gold connector.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "/assets/product-xx99-mark-one-headphones/desktop/image-product.jpg",
        categoryImage: "/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg",
        gallery: {
          first: "/assets/product-xx99-mark-one-headphones/desktop/image-gallery-1.jpg",
          second: "/assets/product-xx99-mark-one-headphones/desktop/image-gallery-2.jpg",
          third: "/assets/product-xx99-mark-one-headphones/desktop/image-gallery-3.jpg"
        },
        others: [
          {
            slug: "xx99-mark-two-headphones",
            name: "XX99 Mark II",
            image: "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg"
            
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/assets/shared/desktop/image-xx59-headphones.jpg"
            
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            image: "/assets/shared/desktop/image-zx9-speaker.jpg"
            
          }
        ]
      },
      {
        id: 4,
        slug: "xx99-mark-two-headphones",
        name: "XX99 Mark II Headphones",
        category: "headphones",
        new: true,
        price: 2999,
        description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
        features: "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
        categoryImage: "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg",
        gallery: {
          first: "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg",
          second: "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg",
          third: "/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg"
        },
        others: [
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 Mark I",
            image:"/assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
            
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/assets/shared/desktop/image-xx59-headphones.jpg"
          
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            image: "/assets/shared/desktop/image-zx9-speaker.jpg"
            
          }
        ]
      },
      {
        id: 5,
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        category: "speakers",
        new: true,
        price: 4500,
        description: "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
        features: "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.\n\nThe ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.",
        includes: [
          { quantity: 2, item: "Speaker unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "/assets/product-zx7-speaker/desktop/image-product.jpg",
        categoryImage: "/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg",
        gallery: {
          first: "/assets/product-zx7-speaker/desktop/image-gallery-1.jpg",
          second: "/assets/product-zx7-speaker/desktop/image-gallery-2.jpg",
          third: "/assets/product-zx7-speaker/desktop/image-gallery-3.jpg"
        },
        others: [
          {
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            image: "/assets/shared/desktop/image-zx9-speaker.jpg"
            
          },
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 Mark I",
            image: "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
            
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/assets/shared/desktop/image-xx59-headphones.jpg"
            
          }
        ]
      },
      {
        id: 6,
        slug: "zx7-speaker",
        name: "ZX7 Speaker",
        category: "speakers",
        new: false,
        price: 3500,
        description: "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
        features: "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).\n\nDiscover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.",
        includes: [
          { quantity: 2, item: "Speaker unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "/assets/product-zx9-speaker/desktop/image-product.jpg",
        categoryImage: "/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg",
        gallery: {
          first: "/assets/product-zx9-speaker/desktop/image-gallery-1.jpg",
          second: "/assets/product-zx9-speaker/desktop/image-gallery-2.jpg",
          third: "/assets/product-zx9-speaker/desktop/image-gallery-3.jpg"
        },
        others: [
          {
            slug: "zx7-speaker",
            name: "ZX7 Speaker",
            image: "/assets/shared/desktop/image-zx7-speaker.jpg"
            
          },
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 Mark I",
            image: "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
            
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: "/assets/shared/desktop/image-xx59-headphones.jpg"
            
          }
        ]
      }
    ];

    products.forEach(product => {
      this.products.set(product.id, product as Product);
    });
  }


  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();