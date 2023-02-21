import { FC } from "react"

const TableContainer: FC = (props) => {
	const { children } = props

	return (
		<div className="relative overflow-x-auto rounded-lg">
			<table className="w-full text-sm text-left text-gray-500">
				{children}
			</table>
		</div>
	)
}

export default TableContainer
