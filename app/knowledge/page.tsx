import { getAllPosts } from '@/lib/posts'

export default function Knowledge() {
  const posts = getAllPosts()
  const knowledgePosts = posts.filter(p => p.category === 'knowledge')

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📚 知识库</h1>
      
      <div className="space-y-4">
        {knowledgePosts.length > 0 ? knowledgePosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">知识</span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <div 
              className="text-gray-600 text-sm line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </div>
        )) : (
          <div className="text-center py-12 text-gray-500">
            <p>暂无内容</p>
            <p className="text-sm mt-2">在 content/knowledge 目录添加 .md 文件</p>
          </div>
        )}
      </div>
    </div>
  )
}
