export const mergeClassNames = (classNames: string[]) => {
	return classNames.filter(Boolean).join(" ")
}

export const conditionalClassNames = (active: boolean, classNames: string[]) => {
	if (active) {
		return mergeClassNames(classNames)
	} else {
		return ""
	}
}
