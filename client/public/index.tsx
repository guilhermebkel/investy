import { AppProps } from "next/app"
import { NextPage } from "next"

import Routes from "@client/routes"
import Head from "next/head"

const Public: NextPage<AppProps> = ({ Component, pageProps }) => (
	<>
		<Head>
			<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet" />
		</Head>

		<Routes />
		<Component {...pageProps} />

		<script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"></script>
	</>
)

export default Public
