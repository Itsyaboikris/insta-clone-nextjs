import Image from 'next/image'
import React from 'react'

export default function Header() {
	return (
		<div>
			<div className='flex items-center justify-between max-w-6xl '>
				<div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid' >
					<Image src={`/Instagram_logo.png`} className='object-contain' alt='logo' fill />
				</div>
				<div className='cursor-pointer h-24 w-10 relative lg:hidden' >
					<Image src={`/instagram.png`} className='object-contain' alt='logo' fill />
				</div>

				<h1>Right side</h1>
			</div>
		</div>
	)
}
