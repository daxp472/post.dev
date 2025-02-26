import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { X, MessageCircle, Heart, Share2 } from 'lucide-react';
import axios from 'axios';
import { ADD_NEW_COMMENT } from '../ApiRoutes';


const SingleComment = () => {
    return (
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-4"
      >
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="text-white font-medium">Sarah Smith</h4>
              <span className="text-sm text-gray-500">5m ago</span>
            </div>
            <p className="text-gray-300 mt-1">
              The impact of AI on job markets is fascinating. While some jobs might be automated, I
              believe AI will create new opportunities we haven't even imagined yet.
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <button className="hover:text-purple-500">Like</button>
              <button className="hover:text-purple-500">Reply</button>
            </div>
          </div>
        </div>
      </motion.div>
    )
}


const CommentReplyBox = ({postID}) => {

    const [Comment, setComment] = useState("")

    const HandlePostReply = async() => {
        const uid = localStorage.getItem("POST.dev@accessToken");
        
        // Validate uid
        if (!uid || uid.trim() === '') {
            console.error("No valid user ID found");
            // Optionally, show a toast or alert to the user
            return;
        }
    
        if (!Comment || Comment.trim() === '') {
            console.error("Comment cannot be empty");
            // Optionally, show a toast or alert to the user
            return;
        }
    
        try {
            console.log("Sending comment:", Comment);
            console.log("Post ID:", postID);
            console.log("User ID:", uid);
    
            const ServerResponse = await axios.post(
                `http://localhost:8080/api/posts/${postID}/comments`, 
                {
                    "content": Comment.trim(), 
                    "user_id": uid.trim()
                },
                { 
                    headers: { Authorization: uid } 
                }
            );
    
            console.log("Server Response:", ServerResponse);
            
            // Reset comment after successful submission
            setComment("");
        } catch (error) {
            console.error("Error posting comment:", error.response ? error.response.data : error.message);
            // Optionally, show error to user via toast or alert
        }
    }

    return (
        <div className='m-6 border border-gray-700 rounded-lg'>
        <div className="p-6 space-y-4">
          <h3 className="text-white text-lg">Share your thoughts</h3>
          <motion.textarea
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full h-32 bg-input-bg rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="What's on your mind about this post?"
            value={Comment}
            onChange={(e)=>setComment(e.target.value)}
          />
        </div>
        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500"
          onClick={HandlePostReply}
        >
          Post Reply
        </motion.button>
      </div>
      </div>
    )
}


const PostCommentPopUp = ({postID}) => {




  return (
    <>
    {/* Screen Overlay Cover */}
    <div className="absolute w-screen h-screen top-0 left-0 backdrop-blur-sm z-10 justify-center flex">
        <div className="mt-[65.1px] bg-zinc-800 rounded-lg max-h-[calc(100vh-66px)] overflow-y-auto">


      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-modal-bg rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Reply to Post</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Post Stats */}
        <div className="px-6 py-3 flex gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5" />
            <span>23 comments</span>
          </div>
        </div>

        {/* Original Post */}
        <div className="px-6 py-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-gray-300">
                Just finished reading an amazing book on artificial intelligence and its impact on society.
                The author presents some fascinating perspectives on how AI will reshape our future
                workplace. What are your thoughts on AI's role in our daily lives? #AI #FutureOfWork
                #TechTrends
              </p>
              <div className="mt-2 text-sm text-gray-500">
                Posted by @johndoe · 2h ago
              </div>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        <CommentReplyBox postID={postID} />

        {/* Previous Comments */}
        <div className="px-6 py-4 border-t border-gray-700">
          <h3 className="text-white text-lg mb-4">Previous Comments</h3>
          
          {/* Comment 1 */}
        <SingleComment />

          {/* Comment 2 */}
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
        
        </div>

        {/* Footer */}
        
      </motion.div>
  


        </div>
    </div>
    
    </>
  )
}

export default PostCommentPopUp