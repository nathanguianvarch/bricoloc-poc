import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { StockItem, Tool } from "shared"

const app = express()
app.use(cors())
app.use(express.json())

const CATALOGUE_URL = process.env.CATALOGUE_URL || 'http://localhost:3001'
const STOCK_URL = process.env.STOCK_URL || 'http://localhost:3002'

app.get('/api/tools', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${CATALOGUE_URL}/tools`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(503).json({ error: 'Catalogue service unavailable' })
  }
})

app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${CATALOGUE_URL}/categories`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(503).json({ error: 'Catalogue service unavailable' })
  }
})

app.get('/api/stock/:toolId', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${STOCK_URL}/stock/${req.params.toolId}`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(503).json({ error: 'Stock service unavailable' })
  }
})

app.get('/api/tools-with-stock', async (req: Request, res: Response) => {
  try {
    const [toolsRes, stockRes] = await Promise.all([
      fetch(`${CATALOGUE_URL}/tools`),
      fetch(`${STOCK_URL}/stock`)
    ])
    const tools = await toolsRes.json() as Tool[]
    const stock = await stockRes.json() as StockItem[]

    const merged = tools.map((tool: any) => ({
      ...tool,
      stock: stock.find((s: any) => s.toolId === tool.id) || null
    }))

    res.json(merged)
  } catch (error) {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

app.listen(3000, () => console.log('API Gateway running on port 3000'))