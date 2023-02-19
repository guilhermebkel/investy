import { useRouter } from "next/router"

import useDidMount from "@client/hooks/useDidMount"

import { isAuthenticated } from "@client/services/auth"

const Routes = () => {
	const router = useRouter()

	const handleRouteChange = () => {
		const hasInvalidAuthentication = !isAuthenticated()
		const isRootPage = router.pathname === "/"

		if (hasInvalidAuthentication) {
			router.push("/login")
		} else if (isRootPage) {
			router.push("/asset-syncs")
		}
	}

	const addHistoryChangeListener = () => {
		window.history.pushState = new Proxy(window.history.pushState, {
			apply: (target, thisArg, argArray) => {
				handleRouteChange()

				return target.apply(thisArg, argArray)
			}
		})

		window.addEventListener("popstate", () => handleRouteChange())
	}

	useDidMount(() => {
		handleRouteChange()
		addHistoryChangeListener()
	})

	return null
}

export default Routes