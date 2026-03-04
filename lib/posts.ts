import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content')

export interface Post {
  id: string
  title: string
  date: string
  category: string
  content?: string
  contentHtml?: string
}

export function getAllPosts(): Post[] {
  // 创建 content 目录
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        ...(matterResult.data as { title: string; date: string; category: string }),
        content: matterResult.content,
      }
    })

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(id: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; category: string }),
  }
}
