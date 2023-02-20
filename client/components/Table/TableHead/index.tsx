import { FC } from "react"

const TableContainer: FC = (props) => {
	const { children } = props

	return (
		<thead className="text-xs text-gray-700 uppercase bg-gray-50">
			<tr>
				{children}
			</tr>
		</thead>
	)
}

export default TableContainer
