import { mergeClassNames } from "@client/utils/style"
import { ButtonHTMLAttributes, FC } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: "primary"
	fullWidth?: boolean
}

const Button: FC<ButtonProps> = (props) => {
	const {
		variant,
		children,
		fullWidth,
		className,
		...rest
	} = props

	const backgroundColorClassName: Record<ButtonProps["variant"], string> = {
		primary: "bg-green-900"
	}

	return (
		<button
			className={mergeClassNames([
				"rounded-lg",
				"min-h-[40px]",
				"font-bold",
				"text-[#FFFFFF]",
				backgroundColorClassName[variant],
				fullWidth && "w-full",
				className
			])}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
