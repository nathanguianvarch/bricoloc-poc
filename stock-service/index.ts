import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { StockItem } from "shared"

const app = express()
app.use(cors())
app.use(express.json())

const stock: StockItem[] = [
  { toolId: 1, available: true, quantity: 3, warehouse: 'Toulouse' },
  { toolId: 2, available: true, quantity: 1, warehouse: 'Bordeaux' },
  { toolId: 3, available: false, quantity: 0, warehouse: 'Toulouse' },
  { toolId: 4, available: true, quantity: 2, warehouse: 'Paris' },
  { toolId: 5, available: false, quantity: 0, warehouse: 'Nantes' },
  { toolId: 6, available: true, quantity: 1, warehouse: 'Lyon' },
]

// Stock de tous les outils
app.get('/stock', (req: Request, res: Response) => {
  res.json(stock)
})

// Stock d'un outil par id
app.get('/stock/:toolId', (req: Request, res: Response) => {
  const toolId = parseInt(req.params.toolId as string)
  const item = stock.find(s => s.toolId === toolId)
  if (!item) return res.status(404).json({ error: 'Stock non trouvé' })
  res.json(item)
})

app.listen(3002, () => console.log('Stock service running on port 3002'))