import React, { useEffect, useState } from 'react'
import { EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, ChatBubbleOvalLeftIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from "../firebase"
import Moment from 'react-moment';

export default function Post({id, img, userImg, caption, username }) {
	
	const {data: session} = useSession()

	const [comment, setComment] = useState("")
	const [comments, setComments] = useState([])

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "posts", id, "comments"), orderBy("timestamp","desc")), (snapshot) => {
				setComments(snapshot.docs)
				console.log("snapshot.docs")
				console.log(snapshot.docs)
				console.log("comments")
				console.log(comments)
			}
		)
	}, [db, id])

	async function sendComment(e) {
		e.preventDefault();

		const commentToSend = comment;
		setComment("");

		await addDoc(collection(db, "posts", id , "comments"), {
			comment: commentToSend,
			username: session.user.username,
			userImage: session.user.image,
			timestamp: serverTimestamp()
		})
	}
	
	return (
		<div className='bg-white my-7 border rounded-md'>
			
			<div className='flex items-center p-5'>
				<img className='h-12 rounded-full object-cover border p-1 mr-3' src={userImg} alt={username} />
				<p className='font-bold flex-1'>{username}</p>
				<EllipsisHorizontalIcon className="h-5" />
			</div>

			<img className='object-cover w-full' src={img} alt="userpost" />

			{
				session && (
					<div className='flex justify-between px-4 pt-4'>
						<div className='flex space-x-4'>
							<HeartIcon className="icon-btn" />
							<ChatBubbleOvalLeftIcon className="icon-btn" />
						</div>
						<BookmarkIcon className="icon-btn" />
					</div>
				)
			}

			

			<p className='p-5 truncate'>
				<span className='font-bold mr-2 '>{username}</span>
				{caption}
			</p>

			{
				(comments.length > 0 )&& (
					<div className='mx-10 max-h-24 overflow-y-scroll scrollbar-none'>
						{
							comments.map((c) => (
								<div className='flex items-center space-x-2 mb-2'>
									<img className='h-7 rounded-full object-cover' src={c.data().userImage} alt="user-image" />
									<p className='font-semibold '>{c.data().username}</p>
									<p className='flex-1 truncate'>{c.data().comment}</p>
									<Moment fromNow>{c.data().timestamp?.toDate()}</Moment>
								</div>
							))
						}
					</div>
				)
			}

			{
				session && (
					<form action='' className='flex items-center p-4'>
						<FaceSmileIcon className='h-7'/>
						<input className='border-none flex-1 focus:ring-0' type="text" placeholder='Enter yout comment...' value={comment} onChange={(e)=>setComment(e.target.value)} />
						<button className='text-blue-400 font-bold disabled:text-blue-200' disabled={!comment.trim()} onClick={sendComment}>Post</button>
					</form>
				)
			}

			

		</div>
	)
}
