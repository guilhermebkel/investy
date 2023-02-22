import { FC } from "react"

export const withComposedFC = <MainComponent, SubComponents extends Record<string, FC>>(mainComponent: MainComponent, subComponents: SubComponents) => {
	return Object.assign(mainComponent, subComponents)
}
