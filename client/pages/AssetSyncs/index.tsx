import ApplicationLayout from "@client/components/ApplicationLayout"

import Head from "@client/components/Head"

import { routeConfig } from "@client/config/route"

const AssetSyncs = () => {
	return (
		<ApplicationLayout>
			<Head
				page={{
					title: `Investy | ${routeConfig.assetSyncs.title}`
				}}	
			/>
			EAE
		</ApplicationLayout>
	)
}

export default AssetSyncs
