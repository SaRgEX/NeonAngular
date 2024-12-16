export interface Product {
  id: number,
  name: string,
  description: string,
  manufacturer: string,
  category: string,
  cost: number,
  count: number,
  createdAt: Date,
  updatedAt: Date,
  imagePath: string | null,
}
