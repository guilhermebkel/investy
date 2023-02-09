import "@client/styles/globals.css"

import { AppProps } from "next/app"
import { NextPage } from "next"

import Routes from "@client/routes"

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
	<>
		<Routes />
		<Component {...pageProps} />
	</>
)

export default App