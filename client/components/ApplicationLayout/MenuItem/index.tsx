import { FC } from "react"
import Link from "next/link"

type MenuItemProps = {
	href: string
	icon?: JSX.Element
}

const MenuItem: FC<MenuItemProps> = (props) => {
	const {
		href,
		icon,
		children
	} = props

	return (
		<li>
			<Link
				href={href}
				className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
			>
				{icon}

				<span
					className="ml-3"
				>
					{children}
				</span>
			</Link>
		</li>
	)
}

export default MenuItem
