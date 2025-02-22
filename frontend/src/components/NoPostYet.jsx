import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const NoPostYet = () => {
    return (
        <>
            <div className=" text-white flex items-center flex-col gap-4  w-full col-span-3 py-24 max-h-full max-[880px]:py-0 ">

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700  justify-center flex flex-col items-center gap-4 p-10 max-[880px]:w-full ">

                    <div className="text-4xl text-center font-bold">You Haven't Posted Yet</div>
                    <p className='text-center'>Share your thoughts, images, or stories with your community</p>
                    <Link className='flex gap-3 items-center justify-center text-xl bg-blue-300 w-fit py-3 px-5 rounded-full '
                        to={'/create'}
                    >
                        <IoAddCircleOutline className='text-2xl' />
                        Create Your First Post
                    </Link>
                    <Link className='flex gap-3 items-center justify-center text-xl  w-fit py-3 px-5 rounded-full '
                        to={'/'}
                    >
                        <ArrowLeft />
                        Return to Home
                    </Link>

                </div>

            </div>
        </>
    )
}

export default NoPostYet