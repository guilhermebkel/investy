import { ReactElement, cloneElement, ReactNode, Children } from "react"

import { mergeClassNames } from "@client/utils/style"
import { hasDisplayName } from "@client/utils/component"

export type DefaultElementProps = Record<string, unknown> & {
	className?: string
}

export const cloneElementSafely = (child: ReactElement, props?: DefaultElementProps) => {
	const { className, ...rest } = (props || {}) as DefaultElementProps

	return (
		cloneElement(child, {
			...child?.props,
			...rest,
			className: mergeClassNames([
				child?.props?.className,
				props?.className
			])
		})
	)
}
