import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import React from 'react';
import {RecoilRoot} from 'recoil';


export default function App({ Component, pageProps:{ session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</SessionProvider>	
	)
}
