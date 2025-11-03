export type ProductInput = {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
};

export type Product = ProductInput & {
  id: string;
};
