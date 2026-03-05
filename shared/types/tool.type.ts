import { StockItem } from "./stock-item.type"

export interface Tool {
  id: number
  name: string
  category: string
  price: number
  image: string
  stock?: StockItem | null;
}