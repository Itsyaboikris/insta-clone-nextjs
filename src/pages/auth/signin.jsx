import React from 'react'
import {getProviders, signIn} from "next-auth/react"
import Header from '@/components/Header'

export default function signin({providers}) {
	return (
		<>
			<Header/>
			<div className='flex justify-center space-x-7 mt-20' >
				<img className='hidden object-cover rotate-6 md:inline-flex md:w-48' src="/insta-banner.png" alt="insta-image"  />
				<div className=''>
					{
						Object.values(providers).map(
							(provider) => (
								<div className='flex flex-col items-center' key={provider.name}>
									<img className='w-32 object-cover' src="/instagram.png" alt="insta-logo"/>
									<p className='text-sm italic my-10'>This app is created for learning pruposes</p>
									<button className='bg-red-400 rounded-lg p-3 text-white hover:bg-red-500' onClick={()=> signIn(provider.id, {callbackUrl: "/"})}>Sign in with {provider.name}</button>
								</div>
							)
						)
					}
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const providers = await getProviders()

	return {
		props: {providers}
	}

}
