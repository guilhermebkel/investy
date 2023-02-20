import { useRouter } from "next/router"

import useDidMount from "@client/hooks/useDidMount"

import { isAuthenticated } from "@client/services/auth"

import { routeConfig } from "@client/config/route"

const Routes = () => {
	const router = useRouter()

	const handleRouteChange = () => {
		const hasInvalidAuthentication = !isAuthenticated()
		const isRootPage = router.pathname === routeConfig.root.path

		console.log(hasInvalidAuthentication, isRootPage)

		if (hasInvalidAuthentication) {
			router.push(routeConfig.login.path)
		} else if (isRootPage) {
			console.log("ENTROU AQUI")
			router.push(routeConfig.assetSyncs.path)
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