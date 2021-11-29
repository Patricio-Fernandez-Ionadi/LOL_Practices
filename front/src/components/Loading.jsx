import "../App.css"

const Loading = () => {
	return (
		<div className='loaderContainer'>
			<div className='loading'>
				<img style={{ maxWidth: "100%" }} src={`./assets/icon.png`} alt='' />
			</div>
		</div>
	)
}

export default Loading
