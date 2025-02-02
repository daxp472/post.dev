import { useState } from "react"
import { BsImage } from "react-icons/bs"
import { FaBitcoin } from "react-icons/fa"

export default function ContentEditor() {
  const [mode, setMode] = useState("write") // 'write' or 'preview'
  const [content, setContent] = useState("")
  const [heading, setHeading] = useState("")
  const [thumbnail, setThumbnail] = useState(null)

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleHeadingChange = (e) => {
    setHeading(e.target.value)
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(URL.createObjectURL(file))
    }
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="mx-auto max-w-3xl p-4">
      {/* Thumbnail Upload */}
      <div className="mb-4 rounded-xl bg-zinc-900 p-8">
        <label className="flex cursor-pointer flex-col items-center justify-center">
          <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
          <div className="mb-2 rounded-lg bg-zinc-800 p-3">
            <BsImage className="h-6 w-6 text-zinc-400" />
          </div>
          <span className="text-xl font-semibold text-white">Add Thumbnail</span>
        </label>
      </div>

      {/* Heading Input */}
      <div className="mb-4 flex items-center justify-between rounded-lg bg-zinc-900 p-4">
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={handleHeadingChange}
          className="w-full bg-transparent text-lg text-zinc-100 placeholder-zinc-500 focus:outline-none"
        />
        <span className="ml-4 text-sm text-zinc-500">255 Words</span>
      </div>

      {/* Write/Preview Toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode("write")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "write" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          Write
        </button>
        <button
          onClick={() => setMode("preview")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "preview" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className="rounded-lg bg-zinc-900 p-4">
        {mode === "write" ? (
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your content here..."
            className="min-h-[200px] w-full resize-none bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
        ) : (
          <div className="rounded-lg bg-zinc-800/50 p-6">
            <div className="mb-4 flex items-center gap-3 w-[320px]">
              <div className="rounded-full bg-orange-500 p-2">
                <FaBitcoin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{heading || "How it Worth in year 2024 ?"}</h2>
                <p className="text-sm text-zinc-400">Sep 9 · Github</p>
              </div>
            </div>
            <p className="text-zinc-300">
              {content ||
                `In 2024, Bitcoin's value has fluctuated significantly, peaking at around $73,000 in March before dropping below $63,000 by May. Predictions for the year's end vary, with estimates ranging from $57,336 to $100,000. This volatility reflects ongoing market dynamics and regulatory influences.`}
            </p>
          </div>
        )}
      </div>

      {/* Word Count */}
      <div className="mt-2 text-right text-sm text-zinc-500">{wordCount} words</div>
    </div>
  )
}

