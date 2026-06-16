/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getAllSlugs } from '@/lib/editorialArticles'
import ArticleEssay from '@/components/editorial/ArticleEssay'
import ArticleDiary from '@/components/editorial/ArticleDiary'
import ArticleLyric from '@/components/editorial/ArticleLyric'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.subtitle,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  if (article.style === 'essay') return <ArticleEssay article={article} />
  if (article.style === 'diary') return <ArticleDiary article={article} />
  return <ArticleLyric article={article} />
}
