const Block = ({ blockValue, x, y}) => {

	const playerHere = () => {
		return true
	}

	return (
		<>
			{playerHere() ? <div className="player"></div> : null}
			
			<div className={`block block${blockValue}`}>

			</div>
		</>
	)
}

export default Block;