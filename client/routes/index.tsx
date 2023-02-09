import { useRouter } from "next/router"

import useDidMount from "@client/hooks/useDidMount"

import { isAuthenticated } from "@client/services/auth"

const Routes = () => {
	const route = useRouter()

	useDidMount(() => {
		const hasInvalidAuthentication = !isAuthenticated()
		const isRootPage = route.pathname === "/"

		if (hasInvalidAuthentication) {
			route.push("/login")
		} else if (isRootPage) {
			route.push("/asset-syncs")
		}
	})

	return null
}

export default Routes