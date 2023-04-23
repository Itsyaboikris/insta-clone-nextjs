import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Story from './Story'
import { useSession, signOut } from "next-auth/react"

export default function Stories() {

	const {data: session} = useSession()

	const [storyUsers, setStoryUsers] = useState([])

	useEffect(() => {

		let storyUsers = []
		for (let i = 0; i < 20; i++) {
			storyUsers.push({
				username: faker.internet.userName(),
				img : faker.image.avatar(), //`https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
				id: i
			})
		}

		setStoryUsers(storyUsers)

	}, [])

	return (
		<div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none'>
			{
				session && (
					<Story img={session.user.image} username={session.user.name} isUser="true"/>
				)
			}
			{
				storyUsers.map (user => (
					<Story key={user.id} username={user.username} img={user.img} />
				))
			}
		</div>
	)
}
