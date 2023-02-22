import { Children, FC, ReactElement, useMemo } from "react"
import { initDropdowns } from "flowbite"

import { cloneElementSafely } from "@client/utils/node"
import { attachSubComponents, containsComponentWithDisplayName } from "@client/utils/component"

import Portal from "@client/components/Portal"

import DropdownItem from "@client/components/Dropdown/DropdownItem"
import DropdownTrigger from "@client/components/Dropdown/DropdownTrigger"

import useConstantId from "@client/hooks/useConstantId"
import useDidMount from "@client/hooks/useDidMount"

const Dropdown: FC = (props) => {
	const { children } = props

	const id = useConstantId()

	useDidMount(() => {
		initDropdowns()
	})

	const parsedElements = useMemo(() => {
		const triggerElement = Children.toArray(children).find(child => containsComponentWithDisplayName(child, DropdownTrigger.displayName))
		const itemElements = Children.toArray(children).filter(child => containsComponentWithDisplayName(child, DropdownItem.displayName))

		return {
			trigger: triggerElement,
			items: itemElements
		}
	}, [children])

	return (
		<>
			{parsedElements.trigger && (
				cloneElementSafely(parsedElements.trigger as ReactElement, {
					["data-dropdown-toggle"]: id
				})
			)}

			<Portal
				container={document.body}
			>
				<div
					id={id}
					className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
				>
					<ul
						className="py-2 text-sm text-gray-700"
					>
						{parsedElements.items}
					</ul>
				</div>
			</Portal>
		</>
	)
}

export default attachSubComponents(Dropdown, {
	Trigger: DropdownTrigger,
	Item: DropdownItem
})
