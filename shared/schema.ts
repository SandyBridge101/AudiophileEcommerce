import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  new: boolean("new").default(false),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  features: text("features").notNull(),
  includes: jsonb("includes").$type<Array<{ quantity: number; item: string }>>().notNull(),
  image: text("image").notNull(),
  categoryImage: text("category_image"),
  gallery: jsonb("gallery").$type<{
    first: string;
    second: string;
    third: string;
  }>(),
  others: jsonb("others").$type<Array<{
    slug: string;
    name: string;
    image: string;
  }>>()
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  zip: text("zip").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  paymentMethod: text("payment_method").notNull(),
  items: jsonb("items").$type<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>>().notNull(),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull(),
  vat: integer("vat").notNull(),
  grandTotal: integer("grand_total").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
