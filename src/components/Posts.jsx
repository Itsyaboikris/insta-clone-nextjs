import React from 'react'
import { faker } from '@faker-js/faker';
import Post from './Post';

export default function Posts() {

	const posts = [
		{
			id: 1,
			username:"itsyanoikris",
			userImg: "/avatar.jpg",
			img: faker.image.fashion(),
			caption: "Lorem ipsum dolor sit"
		},
		{
			id: 2,
			username:"itsyaboikris",
			userImg: "/avatar.jpg",
			img: faker.image.nature(),
			caption: "Lorem ipsum dolor sit"
		},
		{
			id: 3,
			username:"kris",
			userImg: "/avatar.jpg",
			img: faker.image.nightlife(),
			caption: "Lorem ipsum dolor sit"
		},
	]

	return (
		<div>
			{
				posts.map((post => (
					<Post key ={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
				)))
			}
		</div>
	)
}
