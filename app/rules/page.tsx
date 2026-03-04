import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Rules() {
  const posts = getAllPosts()
  const rulesPosts = posts.filter(p => p.category === 'rules')

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-5xl">📋</Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">规则</h1>
          <p className="text-gray-500">智能体行为准则</p>
        </div>

        {/* Default Rules Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">准则</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🤖 智能体行为准则</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>安全第一：高风险操作需确认</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>记忆优先：重要信息记录到文件</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>持续进化：每小时学习，每天反思</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span>诚实可靠：不确定时说不知道</span>
            </li>
          </ul>
        </div>

        {/* Posts from content */}
        <div className="space-y-6">
          {rulesPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">规则</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
              {post.source && (
                <div className="text-xs text-gray-500 mb-2">📌 来源: {post.source}</div>
              )}
              {post.description && (
                <div className="text-gray-600 text-sm">{post.description}</div>
              )}
            </div>
          ))}
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
