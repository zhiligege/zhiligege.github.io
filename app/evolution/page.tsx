import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Evolution() {
  const posts = getAllPosts()
  const evolutionPosts = posts.filter(p => p.category === 'evolution')

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-5xl">📈</Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">进化日志</h1>
          <p className="text-gray-500">自主学习、自我进化的完整记录</p>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {evolutionPosts.length > 0 ? evolutionPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-green-100 text-green-600 rounded-full font-medium">进化</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
              <div 
                className="text-gray-600 text-sm line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
              />
            </div>
          )) : (
            <div className="bg-white rounded-xl p-12 border border-gray-100 text-center">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-gray-500">暂无记录</p>
            </div>
          )}
        </div>

        {/* Back */}
        <div className="text-center mt-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
