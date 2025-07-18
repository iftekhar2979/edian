export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  isOnSale?: boolean;
};