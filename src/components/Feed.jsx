import { UserState } from '@/atoms/userAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

export default function Feed() {

	const [currentUser, setCurrentUser] = useRecoilState(UserState)

	
	return (
		<main className={`grid ${currentUser ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto" } `}>

			<section className='md:col-span-2'>
				<Stories/>
				<Posts/>
			</section>
		
			<section className='hidden md:inline-grid md:col-span-1'>

				<div className='fixed w-[380px]'>

					<MiniProfile/>

					<Suggestions/>

				</div>

			</section>

		</main>
	)
}
