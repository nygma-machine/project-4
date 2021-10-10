const Block = ({ blockValue, x, y, player}) => {

	const playerHere = () => {
		return (player.x === x && player.y === y)
	}

	const playerNear = () => {
		const xDist = x - player.x
		const yDist = y - player.y
		// const distance = (xDist * xDist + (player.y * player.y)
		// if 
	}

	return (
			<div className={`block block${blockValue} ${playerNear}`}>
				{playerHere() ? <div className="player"></div> : null}
			</div>
	)
}

export default Block;