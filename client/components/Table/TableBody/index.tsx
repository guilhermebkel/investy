import { FC, Children, cloneElement, ReactElement } from "react"

import { isLastItem } from "@client/utils/array"

const TableBody: FC = (props) => {
	const { children } = props

	const childrenCount = Children.count(children)

	return (
		<tbody>
			{Children.map(children, (child, index) => (
				cloneElement(child as ReactElement, {
					className: isLastItem(index, childrenCount) ? "" : "border-b"
				})
			))}
		</tbody>
	)
}

export default TableBody
