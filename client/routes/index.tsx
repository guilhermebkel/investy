import { useRouter } from "next/router"

import useDidMount from "@client/hooks/useDidMount"

import { isAuthenticated } from "@client/services/auth"

import { routeConfig } from "@client/config/route"

const Routes = () => {
	const router = useRouter()

	const handleRouteChange = () => {
		const hasInvalidAuthentication = !isAuthenticated()
		const isRootPage = router.pathname === routeConfig.root.path
		const isAssetSyncsPage = router.pathname === routeConfig.assetSyncs.path

		if (hasInvalidAuthentication) {
			router.push(routeConfig.login.path)
		} else if (isRootPage) {
			router.push(routeConfig.assetSyncs.path)
		} else if (isAssetSyncsPage) {
			router.push(routeConfig.notionAssetSyncs.path)
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