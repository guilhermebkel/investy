import PageContainer from "@/client/components/PageContainer"

const Signup = () => (
	<PageContainer>
		<div className="container flex flex-col justify-center items-center h-full">
			<h1 className="text-3xl font-bold">
				Sign in into your account
			</h1>

			<span className="">
				Or <a>create a new account</a>
			</span>
		</div>
	</PageContainer>
)

export default Signup
