import { FC } from "react"

import { PageName, routeConfig } from "@client/config/route"

import LoginPage from "@client/pages/Login"
import SignupPage from "@client/pages/Signup"
import NotionAssetSyncsPage from "@client/pages/AssetSyncs/Notion"

import Redirect from "@client/components/Redirect"

const wrapRouteElement = (routeElement: JSX.Element) => () => routeElement

const Routes: Record<PageName, FC> = {
	root: wrapRouteElement(<Redirect to={routeConfig.notionAssetSyncs.path} />),
	assetSyncs: wrapRouteElement(<Redirect to={routeConfig.notionAssetSyncs.path} />),
	integrations: wrapRouteElement(<Redirect to={routeConfig.notionAssetSyncs.path} />),
	login: wrapRouteElement(<LoginPage />),
	signup: wrapRouteElement(<SignupPage />),
	notionAssetSyncs: wrapRouteElement(<NotionAssetSyncsPage />)
}

export default Routes
