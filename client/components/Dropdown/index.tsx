import { cloneElementSafely } from "@client/utils/node"
import { Children, FC, ReactElement } from "react"

import useConstantId from "@client/hooks/useConstantId"

const Dropdown: FC = (props) => {
	const { children } = props

	const id = useConstantId()

	return (
		<>
			{cloneElementSafely(Children.only(children) as ReactElement, {
				["data-dropdown-toggle"]: id
			})}

			<div id={id} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Dropdown
