import { Bitcoin, MessageSquare, ThumbsUp, Link2, Bookmark } from "lucide-react"

export default function GenericCardComponent({title, desc, image, likes_count, comments_count }) {
  return (
    <div className="w-[320px] overflow-hidden bg-zinc-900 text-white border border-zinc-800 rounded-lg shadow-lg">
      <div className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-orange-500 p-2">
            <Bitcoin className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold leading-none line-clamp-2 min-h-[31.99px]">{title}</h3>
            <p className="text-sm text-zinc-400">Sep 9 · Github</p>
          </div>
        </div>
      </div>
      <div className="p-4 pt-2">
        <p className="text-sm text-zinc-300 mb-3">{desc}</p>
        <div className="relative h-40 w-full overflow-hidden rounded-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20111-0BShR9izBGj4CaQkwBWE1aYdLrbNhl.png"
            alt="Frontend Development"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-800 p-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs font-medium">{likes_count}</span>
          </button>
          <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-medium">{comments_count}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <Link2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}