import { useMemo } from "react"
import Link from "next/link"

import { routeConfig, RouteInfo } from "@client/config/route"

import { mergeClassNames, defaultTransitionClassName } from "@client/utils/style"

import useWindowObject from "@client/hooks/useWindowObject"

type EnrichedRouteInfo = RouteInfo & {
	isHomePage: boolean
	isCurrentPage: boolean
}

const Breadcrumb = () => {
	const windowObject = useWindowObject()

	const currentPathname = windowObject?.location?.pathname || ""

	const getRouteInfo = (where: Pick<RouteInfo, "path">): RouteInfo | null => {
		const routeInfoList = Object.values(routeConfig)

		const selectedRouteInfo = routeInfoList.find(routeInfo => routeInfo.path === where.path)

		return selectedRouteInfo || null
	}

	const currentPathParsed: EnrichedRouteInfo[] = useMemo(() => {
		const pathParams: string[] = currentPathname?.split("/") || []

		const parsedParams = pathParams.map((_, index) => {
			const calculatedPath = pathParams.slice(0, index + 1).join("/") || "/"

			const isCurrentPage = calculatedPath === currentPathname
			const isHomePage = calculatedPath === "/"

			const routeInfo: EnrichedRouteInfo = {
				path: calculatedPath,
				title: "??",
				isCurrentPage,
				isHomePage,
				...getRouteInfo({ path: calculatedPath }) 
			}

			return routeInfo
		})

		return parsedParams
	}, [currentPathname])

	return (
		<nav
			className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
		>
			<ol
				className="inline-flex items-center space-x-1 md:space-x-3"
			>
				{currentPathParsed.map(routeInfo => (
					<>
						{routeInfo.isHomePage ? (
							<li
								key={routeInfo.path}
								className="inline-flex items-center"
							>
								<Link
									href={routeInfo.path}
									className={mergeClassNames([
										"inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-900",
										defaultTransitionClassName
									])}
								>
									<svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
									{routeInfo.title}
								</Link>
							</li>
						) : (
							<li
								key={routeInfo.path}
							>
								<div
									className="flex items-center"
								>
									<svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
									
									{routeInfo.isCurrentPage ? (
										<span
											className="ml-1 text-sm font-medium text-gray-500 md:ml-2"
										>
											{routeInfo.title}
										</span>
									) : (
										<Link
											href="#"
											className={mergeClassNames([
												"inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-900",
												defaultTransitionClassName
											])}
										>
											{routeInfo.title}
										</Link>
									)}
								</div>
							</li>
						)}
					</>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumb
