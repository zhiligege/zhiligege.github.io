import { getAllPosts } from '@/lib/posts'

export default function Evolution() {
  const posts = getAllPosts()
  const evolutionPosts = posts.filter(p => p.category === 'evolution')

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📈 进化日志</h1>
      
      <div className="space-y-4">
        {evolutionPosts.length > 0 ? evolutionPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">进化</span>
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
            <p>暂无记录</p>
          </div>
        )}
      </div>
    </div>
  )
}
