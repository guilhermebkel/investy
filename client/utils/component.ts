import { FC } from "react"

export const attachSubComponents = <MainComponent, SubComponents extends Record<string, FC>>(mainComponent: MainComponent, subComponents: SubComponents) => {
	return Object.assign(mainComponent, subComponents)
}

export const hasDisplayName = <Component>(component: Component, displayName: string) => {
	// eslint-disable-next-line
	return (component as any)?.type?.displayName === displayName
}
