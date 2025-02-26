import axios from "axios";
import { Bitcoin, MessageSquare, ThumbsUp, Link2, Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"
import { LIKE_A_POST_URL, UNLIKE_A_POST_URL } from "../ApiRoutes";
import { FetchUserProfile } from "../utils/AuthFunctions";
import PostCommentPopUp from "./PostCommentPopUp";

export default function GenericCardComponent({title, desc, image, likes_count, comments_count, postID, isLiked=false }) {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes_count);
  const [openPostCommentModel, setOpenPostCommentModel] = useState(false);



  const handleLikeToggle = async() => {
    const uid = localStorage.getItem('POST.dev@accessToken');
    setLiked(!liked);
    setCurrentLikes(liked ? currentLikes - 1 : currentLikes + 1);
    if(liked){
      UNLIKE_A_POST_URL
      try {
        const data = await axios.patch(UNLIKE_A_POST_URL(postID),{},
        { headers: { Authorization: uid } }
        )        
        console.log("working")
      } catch (error) {
          console.log(error)
      }finally{
        await FetchUserProfile()
      }
    }else {
      console.log("unliked")
      console.log(postID)
      console.log(uid)
      try {
        const data = await axios.patch(LIKE_A_POST_URL(postID),{},
        { headers: { Authorization: uid } }
        )        
        console.log("working")
      } catch (error) {
          console.log(error)
      } finally {
        await FetchUserProfile()
      }
    }
    
  };

  const handleBookmarkToggle = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="min-w-[350px] w-full overflow-hidden bg-zinc-900 text-white border border-zinc-800 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-lg hover:border-zinc-700 group">

      {/* Post Comment Model */}
      {openPostCommentModel && (
        <PostCommentPopUp postID={postID} />
      )}

      <div className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 shadow-md group-hover:scale-105 transition-transform">
            <Bitcoin className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1 flex-grow">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[36px] text-zinc-100 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
              <span className="bg-zinc-800 px-1.5 py-0.5 rounded-full">Sep 9</span>
              <span>·</span>
              <span className="bg-zinc-800 px-1.5 py-0.5 rounded-full">Github</span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 pt-2">
        <p className="text-sm text-zinc-300 mb-3 line-clamp-3">{desc}</p>
        <div className="relative h-48 w-full overflow-hidden rounded-lg ">
          <img
            src={image}
            alt="Frontend Development"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-800 p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 transition-all duration-300 ${
              liked 
                ? "text-blue-500 hover:text-blue-600" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">{currentLikes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
            <MessageSquare className="h-4 w-4" onClick={() => setOpenPostCommentModel(true)} />
            <span className="text-xs font-medium">{comments_count}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleBookmarkToggle}
            className={`rounded-full p-2 transition-all duration-300 ${
              bookmarked 
                ? "text-yellow-500 hover:text-yellow-600 bg-yellow-500 bg-opacity-10" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          <button className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <Link2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}