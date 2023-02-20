import { FC } from "react"
import Image from "next/image"

import MenuIconSvg from "@client/assets/icons/menu_icon.svg"

const AsideMenu: FC = (props) => {
	const { children } = props

	return (
		<>
			<button
				data-drawer-target="aside-menu"
				data-drawer-toggle="aside-menu"
				aria-controls="aside-menu"
				type="button"
				className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
			>
				<Image src={MenuIconSvg} alt="" />
			</button>

			<aside
				id="aside-menu"
				className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
			>
				<div
					className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800"
				>
					<ul>
						{children}
					</ul>
				</div>
			</aside>
		</>
	)
}

export default AsideMenu
