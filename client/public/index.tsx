import { AppProps } from "next/app"
import { NextPage } from "next"
import Head from "next/head"

import useDidMount from "@client/hooks/useDidMount"

import { isAuthenticated, logoutAndRedirect } from "@client/services/auth"

const Public: NextPage<AppProps> = ({ Component, pageProps }) => {
	useDidMount(() => {
		const hasInvalidAuthentication = !isAuthenticated()

		if (hasInvalidAuthentication) {
			logoutAndRedirect()
		}
	})

	return (
		<>
			<Head>
				<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
			</Head>
	
			<Component {...pageProps} />
	
			<script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"></script>
		</>
	)
}

export default Public
