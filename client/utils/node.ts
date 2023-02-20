import { ReactElement, cloneElement } from "react"

type DefaultElementProps = Record<string, unknown> & {
	className?: string
}

export const cloneElementSafely = (child: ReactElement, props?: DefaultElementProps) => {
	const { className, ...rest } = (props || {}) as DefaultElementProps

	return (
		cloneElement(child, {
			...child?.props,
			...rest,
			className
		})
	)
}
