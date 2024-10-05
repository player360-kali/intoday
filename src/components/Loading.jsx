import "./loading.scss"
const Loading = () => {
	return (
		<div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
			<div>
				<h2 className="text-[36px] font-semibold">Intoday</h2>
				<div className="linear-loading"></div>
			</div>
		</div>
	)
}

export default Loading