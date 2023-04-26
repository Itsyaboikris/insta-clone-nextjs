import { MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {modalState} from '../atoms/modalAtom'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { UserState } from '@/atoms/userAtom'
import { db } from "../firebase"

export default function Header() {

	const router = useRouter()
	const auth = getAuth()

	const [open, setOpen] = useRecoilState(modalState)
	const [currentUser, setCurrentUser] = useRecoilState(UserState)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
		  if (user) {
			const fetchUser = async () => {
			  const docRef = doc(
				db,
				"users",
				user.auth.currentUser.providerData[0].uid
			  );
			  const docSnap = await getDoc(docRef);
			  if (docSnap.exists()) {
				setCurrentUser(docSnap.data());
			  }
			};
			fetchUser();
		  }
		});
	  }, []);

	function onSignOut() {
		signOut(auth)

		setCurrentUser(null)
	}

	return (
	
		<div className='shadow-sm border-b sticky top-0 bg-white z-30'>
			<div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>

				<div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid' >
					<Image src={`/Instagram_logo.png`} className='object-contain' alt='logo' onClick={()=>router.push('/')} priority fill />
				</div>
				<div className='cursor-pointer h-24 w-10 relative lg:hidden' >
					<Image src={`/instagram.png`} className='object-contain' alt='logo' onClick={()=>router.push('/')} priority fill />
				</div>

				<div className="relative mt-1">
					<div className="absolute top-2 left-2">
						<MagnifyingGlassIcon className='h-5 text-gray-500'/>
					</div>
					<input type="text" className='bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md' placeholder='Search' />
				</div>

				<div className='flex space-x-4 items-center'>
					<HomeIcon className='hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' onClick={()=>router.push('/')} />
					{
						currentUser ? (
							<>
								<PlusCircleIcon className='h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out' onClick={()=>setOpen(true)}/>
								<img onClick={onSignOut} src={currentUser?.userImg} alt="User Image" className='h-10 rounded-full cursor-pointer' />
							</>
							
						) : (
							<button className='' onClick={()=>router.push('/auth/signin')}>Sign In</button>
						)
					}
					
				</div>

			</div>
		</div>
		
	)
}
