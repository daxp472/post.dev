import { useState } from "react"
import { BsImage } from "react-icons/bs"
import { FaBitcoin } from "react-icons/fa"
import { MdOutlinePreview, MdEdit } from "react-icons/md"
import { UploadPicture } from "../utils/CloudinaryHandlers"
import LoaderwaveComponent from "./Loaderwave"
import axios from "axios"
import { UPLOAD_POST_URL } from "../ApiRoutes"



export default function ContentEditor() {
  const [mode, setMode] = useState("write")
  const [content, setContent] = useState("")
  const [heading, setHeading] = useState("")
  const [tags, setTags] = useState("")
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
      setThumbnailImage(file);
    }
  }

  const handlePublish = async () => {
    try {
      const uid = localStorage.getItem('POST.dev@accessToken');

      setIsUploading(true)
      const url = await UploadPicture(thumbnailImage);
      axios.post(UPLOAD_POST_URL, 
        {
          user_id : uid,
          title: heading,
          content: content,
          tags: tags.split("#").map((tag) => tag.trim()),
          image: url,
        },

        { headers: { Authorization: uid } }
      )

      if (url) {
        setIsUploading(false)
      }
      setHeading("")
      setContent("")
      setTags("");
      setThumbnail(null);
      console.log(url)
    } catch (error) {
      setIsUploading(false)
    }
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length


  const UpladingModel = () => {

    return (
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4 w-full h-full z-[99999] flex justify-center items-center backdrop-blur-xl text-2xl text-white flex-col gap-2 ${(isUploading) ? "" : "hidden"}`}>

        <LoaderwaveComponent additionalStyling={"bg-red-600 w-[450px]"} />
        <p>Uploading...</p>

      </div>
    )
  }

  return (

    <div className="mx-auto max-w-full max-md:w-full p-6 space-y-6 max-md:pb-[64px]">
      <UpladingModel />
      {/* Thumbnail Upload */}
      <div className="relative max-md:w-full mb-6 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 shadow-lg transition-all hover:shadow-xl">
        <label className="flex cursor-pointer flex-col items-center justify-center">
          <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnail ? (
            <img src={thumbnail} alt="Thumbnail" className="h-48 w-full rounded-lg object-cover" />
          ) : (
            <>
              <div className="mb-3 rounded-lg bg-zinc-700/50 p-4 transition-colors hover:bg-zinc-700">
                <BsImage className="h-8 w-8 text-zinc-300" />
              </div>
              <span className="text-xl font-semibold text-white">Drop your thumbnail here</span>
              <p className="mt-2 text-sm text-zinc-400">or click to browse</p>
            </>
          )}
        </label>
      </div>

      {/* Heading Input */}
      <div className="mb-6 rounded-lg bg-gradient-to-r from-zinc-900 to-zinc-800 p-5 shadow-md">
        <input
          type="text"
          placeholder="Enter your heading..."
          value={heading}
          onChange={handleHeadingChange}
          className="w-full bg-transparent text-xl font-semibold text-zinc-100 placeholder-zinc-500 focus:outline-none"
        />
        <div className="mt-2 h-1 w-full rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{ width: `${Math.min((heading.length / 255) * 100, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm text-zinc-500">{255 - heading.length} characters remaining</p>
      </div>

      {/* Write/Preview Toggle */}
      <div className="mb-6 flex gap-3 w-full">
        <button
          onClick={() => setMode("write")}
          className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${mode === "write"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
        >
          <MdEdit className="h-5 w-5" />
          Write
        </button>
        <button
          onClick={() => setMode("preview")}
          className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${mode === "preview"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
        >
          <MdOutlinePreview className="h-5 w-5" />
          Preview
        </button>
      </div>

      {/* Content Area */}
      <div className="rounded-xl text-white w-xl max-md:w-full bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 shadow-lg gap-4 flex flex-col">
        {mode === "write" ? (
          <>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-zinc-400">Content</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing your amazing content here..."
                className="min-h-[300px] w-full resize-none bg-transparent text-lg leading-relaxed text-zinc-100 placeholder-zinc-500 focus:outline-none border border-zinc-700 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 focus:scale-105"
              />
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <label className="text-sm font-medium text-zinc-400">Tags</label>
              <textarea
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add Tags Here Use # to start"
                className="min-h-[100px] w-full resize-none bg-transparent text-lg leading-relaxed text-zinc-100 placeholder-zinc-500 focus:outline-none border border-zinc-700 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 focus:scale-105"
              />
            </div>
          </>
        ) : (
          <div className="rounded-lg bg-zinc-800/50 p-8">
            <div className="mb-6 flex items-center gap-4">
              {thumbnail ? (
                <img src={thumbnail} alt="Article" className="h-16 w-16 rounded-lg object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                  <FaBitcoin className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">
                  {heading || "How Bitcoin is Shaping the Future of Finance"}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })} · 5 min read
                </p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none text-zinc-300">
              {content ||
                `In 2024, Bitcoin's value has fluctuated significantly, peaking at around $73,000 in March before dropping below $63,000 by May. Predictions for the year's end vary, with estimates ranging from $57,336 to $100,000. This volatility reflects ongoing market dynamics and regulatory influences.`}
            </div>
          </div>
        )}
      </div>

      {/* Word Count */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <div>
          <span className="font-medium text-zinc-300">{wordCount}</span> words
        </div>
        <button
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  )
}
