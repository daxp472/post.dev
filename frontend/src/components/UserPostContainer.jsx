import React, { useEffect, useState } from 'react'
import { FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import GenericCardComponent from './GenericPostCard';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IoAddCircleOutline } from 'react-icons/io5';
import NoPostYet from './NoPostYet';
import axios from 'axios';
import { DELETE_POST_URL } from '../ApiRoutes';
import { FetchUserProfile } from '../utils/AuthFunctions';
import { FiDelete } from 'react-icons/fi';
import { FaEllipsisV } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FiLoader } from 'react-icons/fi';
import LoaderwaveComponent from './Loaderwave';



const UserPostContainer = ({ Posts, Refresher }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [deletingPost, setDeletingPost] = useState(false);

    const toggleMenu = (postId) => {
        setSelectedPostId(postId);
        setMenuVisible(!menuVisible);
    };

    const handleDelete = (postId) => {
        DeletePostHandler(postId);
        setMenuVisible(false); // Hide menu after action
    };


    const DeletePostHandler = async (pid) => {
        setDeletingPost((prev) => !prev);
        const uid = localStorage.getItem('POST.dev@accessToken');
        const data = await axios.delete(DELETE_POST_URL(pid),
            { headers: { Authorization: uid } }
        )

        await FetchUserProfile()
        Refresher((prev) => prev + 1);
        setDeletingPost((prev) => !prev);
    }

    return (
        <div className="  flex items-center justify-center w-full">
            {
                (deletingPost) && (
                    <div className="absolute w-full h-full text-2xl flex gap-2 flex-col z-50 text-white top-0 left-0 items-center justify-center backdrop-blur-sm">
                        <LoaderwaveComponent additionalStyling={"bg-red-600 w-[450px]"} />
                        <p>Deleting The Post...</p>
                    </div>
                )
            }
            <div className="relative w-full ">
                {/* Glossy effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent  to-transparent rounded-3xl transform rotate-12 blur-sm"></div>

                {/* Main card */}
                <div className="relative bg-grady-800/50 backdrop-blur-smdd rodunded-3xl overflow-hidden bordder border-gray-d700 w-full">


                    {/* Profile content */}
                    <div className=" grid grid-cols-3 max-[1720px]:grid-cols-2 max-[1360px]:grid-cols-1 gap-5 w-full  ">

                        {

                            ((Posts) ? Posts.length == 0 ? true : false : true) ?
                                <NoPostYet />
                                :
                                <>  
                                    

                                    {Posts.map(post => (
                                        <div key={post._id} className="relative">
                                            <div className="" >
                                                <GenericCardComponent
                                                    title={post.title}
                                                    desc={post.content}
                                                    image={post.image}
                                                    likes_count={post.likes_count}
                                                    comments_count={post.comments}
                                                />
                                            </div>
                                            {
                                                (selectedPostId === post._id && 
                                                    (
                                                        <div className="w-full h-full backdrop-blur-[2px] top-0 left-0 absolute"></div>
                                                    )
                                                )
                                            }
                                            <div
                                                className="absolute top-4 right-2 cursor-pointer z-40"
                                                onMouseEnter={() => setSelectedPostId(post._id)}
                                                onMouseLeave={() => setSelectedPostId(null)}
                                            >
                                                <FaEllipsisV className="cursor-pointer text-white" />
                                                {selectedPostId === post._id && (
                                                    <>
                                                        <div className="absolute bg-gray-900 shadow-md right-0 p-2 px-4 shadow-black/10 border-gray-200 border rounded-md">
                                                            <button onClick={() => DeletePostHandler(post._id)} className="block px-4 py-2 text-red-600 cursor-pointer">Delete</button>
                                                            <button className="block px-4 py-2 text-blue-600 cursor-pointer">Edit</button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                </>

                        }


                    </div>
                </div>


            </div>
        </div>
    )
}

export default UserPostContainer    