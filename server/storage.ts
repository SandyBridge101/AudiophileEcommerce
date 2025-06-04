import { products, orders, users, type Product, type Order, type User, type InsertProduct, type InsertOrder, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private users: Map<number, User>;
  private currentProductId: number;
  private currentOrderId: number;
  private currentUserId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.users = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentUserId = 1;
    
    // Initialize with product data
    this.initializeProducts();
  }

  private initializeProducts() {
    const productData = [
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
          { quantity: 6, item: "Multi-size earplugs" },
          { quantity: 1, item: "User manual" },
          { quantity: 1, item: "USB-C charging cable" },
          { quantity: 1, item: "Travel pouch" }
        ],
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1583484963869-ddd8cfecc15f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx59-headphones", name: "XX59", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "zx9-speaker", name: "ZX9 Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
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
        features: "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.\n\nMore than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Connection is simple with bluetooth 5.0 and it is compatible with aptX high quality audio codecs.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 2, item: "Replacement earcups" },
          { quantity: 1, item: "User manual" },
          { quantity: 1, item: "3.5mm 5m audio cable" }
        ],
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-two-headphones", name: "XX99 Mark II", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "zx9-speaker", name: "ZX9 Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
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
          { quantity: 2, item: "Replacement earcups" },
          { quantity: 1, item: "User manual" },
          { quantity: 1, item: "3.5mm 5m audio cable" }
        ],
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-two-headphones", name: "XX99 Mark II", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx59-headphones", name: "XX59", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "zx9-speaker", name: "ZX9 Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
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
        features: "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you're taking a business call or just in your own personal space, the auto on/off and pause features ensure that you'll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5.0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 2, item: "Replacement earcups" },
          { quantity: 1, item: "User manual" },
          { quantity: 1, item: "3.5mm 5m audio cable" }
        ],
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx59-headphones", name: "XX59", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "zx9-speaker", name: "ZX9 Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 5,
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        category: "speakers",
        new: true,
        price: 4500,
        description: "Upgrade your sound system with the all new ZX9 active bookshelf speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
        features: "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo 3.5mm inputs, allowing you to have up to 5 wired source connections for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).\n\nDiscover clear, more natural sounding highs than the competition with ZX9's signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5" aluminum alloy bass unit. You'll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.",
        includes: [
          { quantity: 2, item: "Speaker unit" },
          { quantity: 2, item: "Speaker cloth" },
          { quantity: 1, item: "User manual" },
          { quantity: 1, item: "3.5mm 10m audio cable" },
          { quantity: 1, item: "10m optical cable" }
        ],
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "zx7-speaker", name: "ZX7 Speaker", image: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx59-headphones", name: "XX59", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 6,
        slug: "zx7-speaker",
        name: "ZX7 Speaker",
        category: "speakers",
        new: false,
        price: 3500,
        description: "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
        features: "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.\n\nThe ZX7 speaker is the perfect blend of stylish design and high performance. It houses an 8" woofer and 1" tweeter that produces a perfectly balanced sound that's crisp and precise. The beautiful cherry wood finish and steel grille cloth give it a refined look that will complement any environment.",
        includes: [
          { quantity: 2, item: "Speaker unit" },
          { quantity: 2, item: "Speaker cloth" },
          { quantity: 1, item: "User manual" },
          { quantity: 1, item: "3.5mm 7.5m audio cable" },
          { quantity: 1, item: "7.5m optical cable" }
        ],
        image: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        ],
        others: [
          { slug: "zx9-speaker", name: "ZX9 Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
          { slug: "xx59-headphones", name: "XX59", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      }
    ];

    productData.forEach(product => {
      this.products.set(product.id, product);
      this.currentProductId = Math.max(this.currentProductId, product.id + 1);
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
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
