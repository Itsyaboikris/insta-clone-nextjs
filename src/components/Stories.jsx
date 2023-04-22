import React, { useEffect, useState } from 'react'
import minifaker from 'minifaker'
import 'minifaker/locales/en'
import Story from './Story'

export default function Stories() {

	const [storyUsers, setStoryUsers] = useState([])

	useEffect(() => {
		const storyUsers = minifaker.array(20, (i) => ({
			username: minifaker.username({locale:"en"}),
			img : `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 1000)}`,
			id: i
		}))
	}, [])

	return (
		<div>
			{
				storyUsers.map (user => (
					<Story key={user.id} username={user.username} img={user.img} />
				))
			}
		</div>
	)
}
