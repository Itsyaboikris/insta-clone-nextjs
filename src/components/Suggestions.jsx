import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';

export default function Suggestions() {

	const [suggestions, setSuggestions] = useState([])

	useEffect(()=>{
		let suggestions = []
		for (let i = 0; i < 5; i++) {
			suggestions.push({
				username: faker.internet.userName(),
				jobTitle: faker.name.jobTitle(),
				id: i
			})
			setSuggestions(suggestions)
		}
	},[])

	return (
		<div className='mt-4 ml-10'>
			<div className='flex justify-between mb-5 text-sm'>
				<h3 className='font-bold text-gray-400'>Suggestions for you</h3>
				<button className='text-gray-600 font-semibold'>See all</button>
			</div>

			{
				suggestions.map(suggestion => (
					<div key={suggestion.id} className='flex items-center justify-between mt-3'>
						<img className='h-10 rounded-full border p-[2px]' src={faker.image.avatar()} alt="" />
						<div className='flex-1 ml-4'>
							<h2 className='font-semibold text-sm'>{suggestion.username}</h2>
							<h3 className='text-sm text-gray-400 truncate w-[230px]'>{suggestion.jobTitle}</h3>
						</div>
						<button className='font-semibold text-blue-400'>Follow</button>
					</div>
				))
			}

		</div>
	)
}
