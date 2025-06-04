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
        description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones.",
        features: "Experience unrivalled stereo sound thanks to innovative acoustic technology.",
        includes: [
          { quantity: 2, item: "Earphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1583484963869-ddd8cfecc15f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 2,
        slug: "xx59-headphones",
        name: "XX59 Headphones",
        category: "headphones",
        new: false,
        price: 899,
        description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones.",
        features: "These headphones have been created from durable, high-quality materials tough enough to take anywhere.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-two-headphones", name: "XX99 Mark II", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 3,
        slug: "xx99-mark-one-headphones",
        name: "XX99 Mark I Headphones",
        category: "headphones",
        new: false,
        price: 1750,
        description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction.",
        features: "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-two-headphones", name: "XX99 Mark II", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 4,
        slug: "xx99-mark-two-headphones",
        name: "XX99 Mark II Headphones",
        category: "headphones",
        new: true,
        price: 2999,
        description: "The new XX99 Mark II headphones is the pinnacle of pristine audio.",
        features: "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort.",
        includes: [
          { quantity: 1, item: "Headphone unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "xx99-mark-one-headphones", name: "XX99 Mark I", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 5,
        slug: "zx9-speaker",
        name: "ZX9 Speaker",
        category: "speakers",
        new: true,
        price: 4500,
        description: "Upgrade your sound system with the all new ZX9 active bookshelf speaker.",
        features: "Connect via Bluetooth or nearly any wired source with premium sound quality.",
        includes: [
          { quantity: 2, item: "Speaker unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "zx7-speaker", name: "ZX7 Speaker", image: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
        ]
      },
      {
        id: 6,
        slug: "zx7-speaker",
        name: "ZX7 Speaker",
        category: "speakers",
        new: false,
        price: 3500,
        description: "Stream high quality sound wirelessly with minimal to no loss.",
        features: "The perfect blend of stylish design and high performance audio.",
        includes: [
          { quantity: 2, item: "Speaker unit" },
          { quantity: 1, item: "User manual" }
        ],
        image: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        categoryImage: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        gallery: {
          first: "https://images.unsplash.com/photo-1558618666-fbd691c2cd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          second: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
          third: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        others: [
          { slug: "zx9-speaker", name: "ZX9 Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" }
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