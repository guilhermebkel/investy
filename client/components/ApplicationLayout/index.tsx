import { FC } from "react"

import Image from "next/image"
import Link from "next/link"

import AsideMenu from "@client/components/ApplicationLayout/AsideMenu"
import MenuItem from "@client/components/ApplicationLayout/MenuItem"

import Divider from "@client/components/Divider"

import AppLogoSvg from "@client/assets/app_logo.svg"

import AssetSyncIconSvg from "@client/assets/asset_sync_icon.svg"
import IntegrationIconSvg from "@client/assets/integration_icon.svg"

const ApplicationLayout: FC = (props) => {
	const { children } = props

	return (
		<>
			<AsideMenu>
				<Divider orientation="horizontal" size="sm" />

				<Link
					href="/"
					className="flex items-start justify-items-start"
				>
					<Image src={AppLogoSvg} className="h-6 sm:h-7" alt="" />
				</Link>

				<Divider orientation="horizontal" size="md" />

				<MenuItem
					href="/asset-syncs"
					icon={<Image src={AssetSyncIconSvg} alt="" />}
				>
					AssetSyncs
				</MenuItem>

				<Divider orientation="horizontal" size="xs" />

				<MenuItem
					href="/integrations"
					icon={<Image src={IntegrationIconSvg} alt="" />}
				>
					Integrations
				</MenuItem>
			</AsideMenu>

			<div className="p-4 sm:ml-64">
				<div className="p-4 rounded-lg">
					{children}
				</div>
			</div>
		</>
	)
}

export default ApplicationLayout
