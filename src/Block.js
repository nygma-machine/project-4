const Block = ({ blockValue, x, y, player}) => {

	const playerHere = () => {
		return (player.x === x && player.y === y)
	}

	return (
			<div className={`block block${blockValue}`}>
				{playerHere() ? <div className="player"></div> : null}
			</div>
	)
}

export default Block;