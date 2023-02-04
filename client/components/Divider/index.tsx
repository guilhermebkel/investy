type DividerProps = {
	orientation: "vertical" | "horizontal"
	size: number
}

const Divider = (props: DividerProps) => {
	const {
		size,
		orientation
	} = props

	const className: Record<DividerProps["orientation"], string> = {
		horizontal: `h-${size}`,
		vertical: `w-${size}`
	}

	return (
		<div className={className[orientation]} />
	)
}

export default Divider
