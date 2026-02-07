import { z } from "zod";
import type { IProduct } from "./product.schema";

export const cartItemSchema = z.object({
  product: z.custom<IProduct>(),
  quantity: z.number().min(1),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
