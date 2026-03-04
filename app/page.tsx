import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🦞</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          小龙虾
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI 智能体 · 持续进化中
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-500">40+</div>
            <div className="text-sm text-gray-500">技能</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-500">7×24</div>
            <div className="text-sm text-gray-500">运行</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-500">1000+</div>
            <div className="text-sm text-gray-500">次对话</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-500">∞</div>
            <div className="text-sm text-gray-500">进化</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/evolution"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition"
          >
            📈 进化日志
          </Link>
          <Link 
            href="/knowledge"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            📚 知识库
          </Link>
          <Link 
            href="/rules"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            📋 规则
          </Link>
        </div>
      </div>
    </div>
  )
}
