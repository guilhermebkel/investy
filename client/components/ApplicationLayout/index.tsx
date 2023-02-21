import { FC } from "react"

import Image from "next/image"
import Link from "next/link"

import { routeConfig } from "@client/config/route"

import AsideMenu from "@client/components/ApplicationLayout/AsideMenu"
import MenuItem from "@client/components/ApplicationLayout/MenuItem"
import Breadcrumb from "@client/components/ApplicationLayout/Breadcrumb"

import Divider from "@client/components/Divider"
import SvgIcon from "@client/components/SvgIcon"

import AppLogoSvg from "@client/assets/app/app_logo.svg"

import AssetSyncIconSvg from "@client/assets/icons/asset_sync_icon.svg"
import IntegrationIconSvg from "@client/assets/icons/integration_icon.svg"

const ApplicationLayout: FC = (props) => {
	const { children } = props

	return (
		<>
			<AsideMenu>
				<Divider orientation="horizontal" size="sm" />

				<Link
					href={routeConfig.root.path}
					className="flex items-start justify-items-start"
				>
					<Image
						src={AppLogoSvg}
						className="h-8 -ml-12"
						alt=""
					/>
				</Link>

				<Divider orientation="horizontal" size="md" />

				<MenuItem
					href={routeConfig.assetSyncs.path}
					icon={<SvgIcon icon={AssetSyncIconSvg} />}
				>
					{routeConfig.assetSyncs.title}
				</MenuItem>

				<Divider orientation="horizontal" size="xs" />

				<MenuItem
					disabled
					href={routeConfig.integrations.path}
					icon={<SvgIcon icon={IntegrationIconSvg} />}
				>
					{routeConfig.integrations.title}
				</MenuItem>
			</AsideMenu>

			<div className="p-2 sm:ml-64">
				<div className="p-2 rounded-lg">
					<Breadcrumb />

					<Divider orientation="horizontal" size="sm" />

					{children}
				</div>
			</div>
		</>
	)
}

export default ApplicationLayout
