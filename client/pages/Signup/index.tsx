import { FormEventHandler, useState } from "react"
import Image from "next/image"

import PageContainer from "@client/components/PageContainer"

import LogoSvg from "@client/assets/logo.svg"

type Data = {
	name: string
	email: string
	password: string
}

const Signup = () => {
	const [data, setData] = useState({} as Data)

	const handleChange = <Field extends keyof Data>(field: Field, value: Data[Field]) => {
		setData(lastState => ({
			...lastState,
			[field]: value
		}))
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
	}

	return (
		<PageContainer>
			<div className="container flex flex-col justify-center items-center h-full">
				<Image src={LogoSvg} alt="" className="w-40" />

				<div className="h-8" />

				<h1 className="text-3xl text-gray-900 font-bold text-center">
					Create a new account
				</h1>

				<span className="text-gray-900 text-base text-center">
					Or <a>sign in with an existing account</a>
				</span>

				<div className="h-8" />

				<form
					className="bg-[#FFFFFF] max-w-md w-full rounded-lg shadow-sm p-5"
					onSubmit={handleSubmit}
				>
					<div>
						<label
							className="block text-gray-900 text-sm font-medium mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							value={data.name}
							onChange={({ target }) => handleChange("name", target.value)}
						/>
					</div>

					<div className="h-4" />

					<div>
						<label
							className="block text-gray-900 text-sm font-medium mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="text"
							value={data.email}
							onChange={({ target }) => handleChange("email", target.value)}
						/>
					</div>

					<div className="h-4" />

					<div>
						<label
							className="block text-gray-900 text-sm font-medium mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							value={data.password}
							onChange={({ target }) => handleChange("password", target.value)}
						/>
					</div>

					<div className="h-4" />

					<div className="flex justify-end">
						<a className="text-xs">Forgot your password?</a>
					</div>

					<div className="h-4" />

					<button
						className="w-full bg-green-900 rounded-lg min-h-[40px] font-bold text-[#FFFFFF]"
						type="submit"
					>
						Sign up
					</button>
				</form>
			</div>
		</PageContainer>
	)
}

export default Signup
