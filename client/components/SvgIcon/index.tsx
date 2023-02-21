import Image, { StaticImageData } from "next/image"

type SvgIconProps = {
	icon: StaticImageData
	className?: string
}

const SvgIcon = (props: SvgIconProps) => {
	const { icon, className } = props

	return (
		<Image
			src={icon}
			className={className}
			alt=""
		/>
	)
}

export default SvgIcon
