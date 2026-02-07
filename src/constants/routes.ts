export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  CART: "/cart",
  PROFILE: "/profile",
  USERS: "/users",
  LOGIN: "/login",
} as const;
