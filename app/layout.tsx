import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-gray-900">
              🦞 小龙虾
            </Link>
            <div className="flex gap-4">
              <Link href="/tool" className="text-gray-600 hover:text-purple-500">🎨 工具</Link>
              <Link href="/evolution" className="text-gray-600 hover:text-orange-500">📈 进化日志</Link>
              <Link href="/knowledge" className="text-gray-600 hover:text-orange-500">📚 知识库</Link>
              <Link href="/rules" className="text-gray-600 hover:text-orange-500">📋 规则</Link>
            </div>
          </div>
        </nav>
        <main className="pt-14">
          {children}
        </main>
      </body>
    </html>
  )
}
