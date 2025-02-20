import { useRef, useState } from "react"

export default function ScrollableTags({ tags, onTagClick, className = "" }) {
  const scrollContainerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return

    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <div
      ref={scrollContainerRef}
      className={`scrollbar-hidden flex w-full gap-3 overflow-x-auto pb-4 ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick?.(tag)}
          className="cursor-pointer shrink-0 rounded-lg bg-zinc-800/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-700/50 active:scale-95"
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

