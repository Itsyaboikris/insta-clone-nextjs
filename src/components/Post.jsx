import React from 'react'
import { EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline'

export default function Post({id, img, userImg, caption, username }) {
	return (
		<div className='bg-white my-7 border rounded-md'>
			
			<div className='flex items-center p-5'>
				<img className='h-12 rounded-full object-cover border p-1 mr-3' src={userImg} alt={username} />
				<p className='font-bold flex-1'>{username}</p>
				<EllipsisHorizontalIcon className="h-5" />
			</div>

			<img className='object-cover w-full' src={img} alt="userpost" />

			<div className='flex justify-between px-4 pt-4'>
				<div className='flex space-x-4'>
					<HeartIcon className="icon-btn" />
					<ChatBubbleOvalLeftIcon className="icon-btn" />
				</div>
				<BookmarkIcon className="icon-btn" />
			</div>

			<p className='p-5 truncate'>
				<span className='font-bold mr-2 '>{username}</span>
				{caption}
			</p>

			<form action='' className='flex items-center p-4'>
				<FaceSmileIcon className='h-7'/>
				<input className='border-none flex-1 focus:ring-0' type="text" placeholder='Enter yout comment...' />
				<button className='text-blue-400 font-bold'>Post</button>
			</form>

		</div>
	)
}
