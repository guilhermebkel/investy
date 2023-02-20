export type RouteInfo = {
	path: string
	title: string
}

type PageName = "root" | "login" | "signup" | "assetSyncs"

export const routeConfig: Record<PageName, RouteInfo> = {
	root: {
		path: "/",
		title: "Home"
	},
	login: {
		path: "/login",
		title: "Login"
	},
	signup: {
		path: "/signup",
		title: "Signup"
	},
	assetSyncs: {
		path: "/asset-syncs",
		title: "Asset Syncs"
	}
}
