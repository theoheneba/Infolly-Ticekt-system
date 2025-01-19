import { getKnowledgeBaseCategories } from '@/lib/db'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default async function KnowledgeBasePage() {
  const categories = await getKnowledgeBaseCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {category.articles.map((article) => (
                  <li key={article.id}>
                    <Link href={`/knowledge-base/${category.slug}/${article.slug}`} className="text-blue-600 hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

