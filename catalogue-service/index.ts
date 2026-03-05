import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { Tool } from "shared"

const app = express()
app.use(cors())
app.use(express.json())

const tools: Tool[] = [
  { id: 1, name: 'Perceuse Bosch GSB 18V', category: 'Électroportatif', price: 15, image: '🔧' },
  { id: 2, name: 'Ponceuse orbitale Makita', category: 'Électroportatif', price: 12, image: '🪚' },
  { id: 3, name: 'Échafaudage aluminium 3m', category: 'Échafaudage', price: 35, image: '🏗️' },
  { id: 4, name: 'Bétonneuse 120L', category: 'Gros œuvre', price: 45, image: '⚙️' },
  { id: 5, name: 'Karcher HD 5/15', category: 'Nettoyage', price: 20, image: '💧' },
  { id: 6, name: 'Marteau piqueur SDS-Max', category: 'Électroportatif', price: 30, image: '⛏️' },
]

app.get('/tools', (req: Request, res: Response) => {
  const { category } = req.query
  if (category) {
    return res.json(tools.filter(t => t.category === category))
  }
  res.json(tools)
})

app.get('/tools/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string)
  const tool = tools.find(t => t.id === id)
  if (!tool) return res.status(404).json({ error: 'Outil non trouvé' })
  res.json(tool)
})

app.get('/categories', (req: Request, res: Response) => {
  const categories = [...new Set(tools.map(t => t.category))]
  res.json(categories)
})

app.listen(3001, () => console.log('Catalogue service running on port 3001'))