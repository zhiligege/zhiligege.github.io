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
  // 递归读取所有子目录
  function getAllFiles(dir: string): string[] {
    const files: string[] = []
    if (!fs.existsSync(dir)) return files
    
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath))
      } else if (item.endsWith('.md')) {
        files.push(fullPath)
      }
    }
    return files
  }

  const allFiles = getAllFiles(postsDirectory)
  
  const allPosts = allFiles.map((fullPath) => {
    const fileName = path.basename(fullPath)
    const id = fileName.replace(/\.md$/, '')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      title: String(matterResult.data.title || ''),
      date: String(new Date(matterResult.data.date).toLocaleString('zh-CN')),
      category: String(matterResult.data.category || ''),
      content: matterResult.content,
    }
  })

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // 倒序，最新的在前
  })
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
