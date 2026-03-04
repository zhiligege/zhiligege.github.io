import { getAllPosts } from '@/lib/posts'

export default function Rules() {
  const posts = getAllPosts()
  const rulesPosts = posts.filter(p => p.category === 'rules')

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📋 规则</h1>
      
      <div className="space-y-4">
        {rulesPosts.length > 0 ? rulesPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">规则</span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <div 
              className="text-gray-600 text-sm line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </div>
        )) : (
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">🤖 智能体行为准则</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• 安全第一：高风险操作需确认</li>
              <li>• 记忆优先：重要信息记录到文件</li>
              <li>• 持续进化：每小时学习，每天反思</li>
              <li>• 诚实可靠：不确定时说不知道</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
