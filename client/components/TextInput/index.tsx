import { InputHTMLAttributes, HTMLInputTypeAttribute } from "react"
import { mergeClassNames, conditionalClassNames } from "@client/utils/style"

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	fullWidth?: boolean
	name?: string
	value?: string
	onValueChange?: (value: string) => void
	type?: Extract<HTMLInputTypeAttribute, "text" | "password">
}

const TextInput = (props: TextInputProps) => {
	const {
		fullWidth,
		value,
		onValueChange,
		name,
		className,
		...rest
	} = props

	return (
		<input
			className={mergeClassNames([
				"appearance-none border rounded py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline",
				conditionalClassNames(fullWidth, ["w-full"]),
				className
			])}
			id={name}
			type="text"
			value={value}
			onChange={({ target }) => onValueChange(target.value)}
			{...rest}
		/>
	)
}

export default TextInput
