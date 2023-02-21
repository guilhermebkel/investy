import { Children, FC, ReactElement } from "react"

import { cloneElementSafely } from "@client/utils/node"

import useConstantId from "@client/hooks/useConstantId"

const Dropdown: FC = (props) => {
	const { children } = props

	const id = useConstantId()
	const ids2 = useConstantId()

	return (
		<>
			{cloneElementSafely(Children.only(children) as ReactElement, {
				["data-dropdown-toggle"]: id,
				["data-dropdown-trigger"]: "click"
			})}

			<div id={id} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
				<ul className="py-2 text-sm text-gray-700" aria-labelledby={ids2}>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">Sign out</a>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Dropdown
