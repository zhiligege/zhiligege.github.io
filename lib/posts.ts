import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content')

export interface Post {
  id: string
  title: string
  date: string
  category: string
  description: string
  source: string
}

export function getAllPosts(): Post[] {
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
    const { data, content } = matter(fileContents)

    // 提取来源
    let source = ''
    const sourceMatch = content.match(/来源[:\s]+([^\n]+)/)
    if (sourceMatch) {
      source = sourceMatch[1].replace(/^- /, '').trim()
    }
    
    // 提取摘要 - 找 "## 摘要" 后的内容
    let description = ''
    const summaryMatch = content.match(/## 摘要\n([^\n#]+)/)
    if (summaryMatch) {
      description = summaryMatch[1].replace(/^- /, '').trim()
    } else {
      // 默认用内容前150字
      const cleanContent = content
        .replace(/^#.*$/gm, '')
        .replace(/^##.*$/gm, '')
        .replace(/^- /gm, '')
        .replace(/\*\*/g, '')
        .substring(0, 150)
      description = cleanContent.trim() + '...'
    }

    return {
      id,
      title: String(data.title || ''),
      date: String(data.date || ''),
      category: String(data.category || ''),
      description,
      source,
    }
  })

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}
