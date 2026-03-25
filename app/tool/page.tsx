"use client"

import { useState } from 'react'

export default function ToolPage() {
  const [prompt, setPrompt] = useState('')
  const [negative, setNegative] = useState('')
  const [ratio, setRatio] = useState('1:1')
  const [count, setCount] = useState(1)
  const [model, setModel] = useState('image-01')
  const [apiKey] = useState('sk-cp-Q0BZ_fROWTLhU4uc1aNkF8fe-JLOWpKjKRrrEnj8IehWoSCCFBI-L1j7tp-GstR6__76SyvnY2jJ-xCwT-36TTZs8mDnvMrxNVKBfrpFB-oSRsW4l8NKe0s')
  const [images, setImages] = useState<{src: string}[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!prompt) {
      setError('请输入提示词')
      return
    }
    setLoading(true)
    setError('')
    setImages([])

    try {
      const body: Record<string, unknown> = {
        model,
        prompt,
        n: count,
        aspect_ratio: ratio,
      }
      if (negative) body.negative_prompt = negative

      const response = await fetch('https://api.minimax.chat/v1/image_generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error?.message || '生成失败')
      }

      let imgs: {src: string}[] = []
      
      if (data?.data?.image_urls) {
        imgs = data.data.image_urls.map((url: string) => ({ src: url }))
      } else if (data?.images) {
        imgs = data.images.map((img: {url?: string; b64_json?: string}) => ({
          src: img.url || (img.b64_json ? `data:image/png;base64,${img.b64_json}` : '')
        }))
      }

      setImages(imgs)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '生成失败'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const presets = [
    { label: '🌆 赛博城市', text: '赛博朋克城市夜景，霓虹灯倒影，写实风格' },
    { label: '🎋 水墨山水', text: '水墨山水画，云雾缭绕，留白，写意风格' },
    { label: '🤖 科技机器人', text: '未来科技感机器人，金属质感，工业设计，8K渲染' },
    { label: '📦 产品摄影', text: '极简主义产品摄影，白色背景，柔和阴影' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MiniMax 图像生成器</h1>
          <p className="text-gray-500">使用 MiniMax image-01 模型生成图像</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">// 生成参数</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">提示词 Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述你想生成的图像..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {presets.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setPrompt(p.text)}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">反向提示词（可选）</label>
                <input
                  type="text"
                  value={negative}
                  onChange={(e) => setNegative(e.target.value)}
                  placeholder="不希望出现的元素..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">图像比例</label>
                  <select
                    value={ratio}
                    onChange={(e) => setRatio(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="1:1">1:1 正方形</option>
                    <option value="16:9">16:9 横屏</option>
                    <option value="9:16">9:16 竖屏</option>
                    <option value="4:3">4:3 标准</option>
                    <option value="3:4">3:4 人像</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">生成数量</label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl">
                    <button
                      onClick={() => setCount(Math.max(1, count - 1))}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-sm">{count}</span>
                    <button
                      onClick={() => setCount(Math.min(4, count + 1))}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">模型</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="image-01">image-01（标准）</option>
                  <option value="image-01-dv2">image-01-dv2（增强）</option>
                </select>
              </div>

              <button
                onClick={generate}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? '⏳ 生成中...' : '✦ 开始生成'}
              </button>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">// 生成结果</h2>
              <span className="text-xs text-gray-400">{images.length} 张图像</span>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-sm">正在调用 MiniMax API...</p>
              </div>
            )}

            {!loading && images.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">✦</div>
                <p className="text-sm">填写提示词并点击「开始生成」</p>
              </div>
            )}

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img.src}
                      alt={`Generated ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <a
                      href={img.src}
                      download={`minimax_${Date.now()}_${i + 1}.png`}
                      className="absolute bottom-2 right-2 px-3 py-1 bg-white/90 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      ↓ 下载
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
