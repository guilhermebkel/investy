import { InputHTMLAttributes, HTMLInputTypeAttribute } from "react"
import { mergeClassNames, conditionalClassNames } from "@client/utils/style"

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	fullWidth?: boolean
	name?: string
	value?: string
	onValueChange?: (value: string) => void
	errorMessage?: string
	type?: Extract<HTMLInputTypeAttribute, "text" | "password">
}

const TextInput = (props: TextInputProps) => {
	const {
		fullWidth,
		value,
		onValueChange,
		name,
		errorMessage,
		className,
		...rest
	} = props

	return (
		<>
			<input
				className={mergeClassNames([
					"appearance-none border rounded py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-green-900",
					conditionalClassNames(fullWidth, ["w-full"]),
					conditionalClassNames(Boolean(errorMessage), ["border-red-500"]),
					className
				])}
				id={name}
				type="text"
				value={value}
				onChange={({ target }) => onValueChange(target.value)}
				{...rest}
			/>

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

export default TextInput
