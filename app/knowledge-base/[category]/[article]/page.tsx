import { getKnowledgeBaseArticle } from '@/lib/db'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'

export default async function KnowledgeBaseArticlePage({ params }: { params: { category: string, article: string } }) {
  const articleData = await getKnowledgeBaseArticle(params.category, params.article)

  if (!articleData) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{articleData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
        </CardContent>
      </Card>
    </div>
  )
}

