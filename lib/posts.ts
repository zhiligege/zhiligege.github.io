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

// 简单的 markdown 转 HTML
function markdownToHtml(markdown: string): string {
  let html = markdown
  
  // 处理标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 处理粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 处理列表
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
  
  // 处理换行
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'
  
  // 清理空标签
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p><h/g, '<h')
  html = html.replace(/<\/h.*><\/p>/g, '</h2>')
  
  return html
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

    // 提取 description（摘要）和 source（来源）
    let description = ''
    let source = ''
    
    // 从 markdown 内容中提取
    const lines = content.split('\n')
    for (const line of lines) {
      if (line.includes('## 摘要') || line.includes('##摘要')) {
        description = lines[lines.indexOf(line) + 1]?.trim() || ''
      }
      if (line.includes('## 来源') || line.includes('##来源')) {
        source = lines[lines.indexOf(line) + 1]?.replace('- 来源:', '')?.trim() || ''
      }
    }
    
    // 如果没找到，用内容前100字
    if (!description) {
      description = content.replace(/^#.*$/gm, '').replace(/^##.*$/gm, '').substring(0, 100) + '...'
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
