const Block = ({ blockValue, x, y, player, mazeDifficulty}) => {
// Variable that returns player coordinates
	const playerHere = () => {
		return (player.x === x && player.y === y)
	}
// Variable that controls the amount of lighting around the player coordinates
	const playerNear = () => {
		const xDist = x - player.x
		const yDist = y - player.y
		const distance = Math.floor(Math.sqrt(xDist * xDist + yDist * yDist))
		if (mazeDifficulty === 'easy')
		{
			return `distance0`
		}
		return `distance${distance}`
	}

	return (
			<div className={`block block${blockValue} ${playerNear()}`}>
				{playerHere() ? <div className="player"></div> : null}
			</div>
	)
}

export default Block;