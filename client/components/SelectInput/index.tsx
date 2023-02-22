import { FC, SelectHTMLAttributes } from "react"

import { mergeClassNames, conditionalClassNames } from "@client/utils/style"
import { attachSubComponents } from "@client/utils/component"

import SelectInputOption from "@client/components/SelectInput/SelectInputOption/indexx"

type SelectInputProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "type"> & {
	fullWidth?: boolean
	name?: string
	value?: string
	onValueChange?: (value: string) => void
	errorMessage?: string
}

const SelectInput: FC<SelectInputProps> = (props) => {
	const {
		fullWidth,
		value,
		onValueChange,
		name,
		errorMessage,
		className,
		children,
		...rest
	} = props

	return (
		<>
			<select
				className={mergeClassNames([
					"appearance-none border border-gray-200 rounded py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:ring-green-900 focus:border-green-900",
					conditionalClassNames(fullWidth, ["w-full"]),
					conditionalClassNames(Boolean(errorMessage), ["border-red-500"]),
					className
				])}
				id={name}
				value={value}
				onChange={({ target }) => onValueChange(target.value)}
				{...rest}
			>
				{children}
			</select>

			{errorMessage && (
				<p
					className="text-red-500 text-xs italic"
				>
					{errorMessage}
				</p>
			)}
		</>
	)
}

export default attachSubComponents(SelectInput, {
	Option: SelectInputOption
})
