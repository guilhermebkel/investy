import { AnchorHTMLAttributes, FC } from "react"
import NextLink from "next/link"

import { defaultTransitionClassName, mergeClassNames } from "@client/utils/style"

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string
}

const Link: FC<LinkProps> = (props) => {
	const { children, className, ...rest } = props

	return (
		<NextLink
			{...rest}
			className={mergeClassNames([
				className || "text-[#02C366] hover:underline",
				defaultTransitionClassName
			])}
		>
			{children}
		</NextLink>
	)
}

export default Link
