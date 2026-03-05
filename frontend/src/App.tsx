import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Tool } from "shared";

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL ?? "";

function ToolCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-2/3" />
      </CardContent>
    </Card>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="text-5xl mb-2">{tool.image}</div>
        <CardTitle className="text-base leading-snug">{tool.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{tool.category}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-2xl font-bold text-orange-500">
          {tool.price}€
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            / jour
          </span>
        </p>
        {tool.stock ? (
          tool.stock.available ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              ✅ Disponible · {tool.stock.warehouse} · {tool.stock.quantity} en
              stock
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              ❌ Indisponible
            </Badge>
          )
        ) : (
          <Badge variant="outline">Stock inconnu</Badge>
        )}
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [toolsRes, categoriesRes] = await Promise.all([
        fetch(`${GATEWAY_URL}/api/tools-with-stock`),
        fetch(`${GATEWAY_URL}/api/categories`),
      ]);
      setTools(await toolsRes.json());
      setCategories(await categoriesRes.json());
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered =
    selectedCategory === "Tous"
      ? tools
      : tools.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-1">
            🔨 BricoLoc 2.0
          </h1>
          <p className="text-muted-foreground">
            Catalogue de location d'outils
          </p>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {["Tous", ...categories].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? "bg-orange-500 hover:bg-orange-600"
                  : ""
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ToolCardSkeleton key={i} />
              ))
            : filtered.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
        </div>

        <div className="border rounded-lg p-4 bg-white text-xs text-muted-foreground">
          <p className="font-semibold mb-1">🏗️ Architecture microservices</p>
          <p>
            React (5173) → API Gateway Express (3000) → Catalogue Service (3001)
            + Stock Service (3002)
          </p>
        </div>
      </div>
    </div>
  );
}
