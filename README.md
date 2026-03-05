# BricoLoc 2.0 — PoC Architecture Microservices

## Services

| Service           | Port | Rôle                                           |
| ----------------- | ---- | ---------------------------------------------- |
| Frontend          | 5173 | Interface React — catalogue et disponibilités  |
| API Gateway       | 3000 | Point d'entrée unique, agrégation des services |
| Catalogue Service | 3001 | Gestion des outils et catégories               |
| Stock Service     | 3002 | Gestion des disponibilités par entrepôt        |

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Bun](https://bun.sh/) (optionnel, pour lancer en local sans Docker)

## Lancer le PoC

### Avec Docker (recommandé)

```bash
docker-compose up --build
```

Ouvrir [http://localhost:5173](http://localhost:5173)

### En local sans Docker

Créer un fichier `frontend/.env.local` avec l'URL de la gateway :

```env
VITE_GATEWAY_URL=http://localhost:3000
```

Lancer chaque service dans un terminal séparé :

```bash
# Terminal 1
cd catalogue-service && bun index.ts

# Terminal 2
cd stock-service && bun index.ts

# Terminal 3
cd api-gateway && bun index.ts

# Terminal 4
cd frontend && bun run dev
```

## Endpoints API

### API Gateway (port 3000)

| Méthode | Route                   | Description                     |
| ------- | ----------------------- | ------------------------------- |
| GET     | `/api/tools`            | Liste tous les outils           |
| GET     | `/api/categories`       | Liste les catégories            |
| GET     | `/api/stock/:toolId`    | Stock d'un outil                |
| GET     | `/api/tools-with-stock` | Outils + disponibilités agrégés |

### Catalogue Service (port 3001)

| Méthode | Route         | Description           |
| ------- | ------------- | --------------------- |
| GET     | `/tools`      | Liste tous les outils |
| GET     | `/tools/:id`  | Détail d'un outil     |
| GET     | `/categories` | Liste les catégories  |

### Stock Service (port 3002)

| Méthode | Route            | Description              |
| ------- | ---------------- | ------------------------ |
| GET     | `/stock`         | Stock de tous les outils |
| GET     | `/stock/:toolId` | Stock d'un outil par id  |
