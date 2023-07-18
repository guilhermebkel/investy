import { FC, ReactElement, useRef } from "react"
import { Dropdown as TailwindDropdown } from "flowbite"

import { cloneElementSafely } from "@client/utils/node"

import Portal from "@client/components/Portal"

import DropdownItem from "@client/components/Dropdown/DropdownItem"
import DropdownTrigger from "@client/components/Dropdown/DropdownTrigger"

import useConstantId from "@client/hooks/useConstantId"
import useSubComponents, { attachSubComponents, buildSubComponents } from "@client/hooks/useSubComponents"

const SubComponents = buildSubComponents({
	Trigger: DropdownTrigger,
	Item: DropdownItem
})

const Dropdown: FC = (props) => {
	const { children } = props

	const id = useConstantId()
	const triggerId = useConstantId()

	const dropdown = useRef<TailwindDropdown>()

	const subComponents = useSubComponents(children, SubComponents)

	const initializeDropdown = (targetElement: HTMLDivElement) => {
		const triggerElement = document.getElementById(triggerId)

		if (!dropdown.current && targetElement && triggerElement) {
			dropdown.current = new TailwindDropdown(targetElement, triggerElement)
		}
	}

	return (
		<>
			{subComponents.Trigger[0] && (
				cloneElementSafely(subComponents.Trigger[0] as ReactElement, {
					id: triggerId,
					["data-dropdown-toggle"]: id
				})
			)}

			<Portal
				container={document.body}
			>
				<div
					id={id}
					className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
					ref={initializeDropdown}
				>
					<ul
						className="py-2 text-sm text-gray-700"
					>
						{subComponents.Item}
					</ul>
				</div>
			</Portal>
		</>
	)
}

export default attachSubComponents(Dropdown, SubComponents)
