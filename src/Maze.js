import { useState, useEffect } from 'react';
import Row from './Row.js';
import { Link } from 'react-router-dom'

const Maze = (props) => {

	const [mazeMap, setMazeMap] = useState([])

	const [player, setPlayer] = useState({})

	const [keyPress, setKeyPress] = useState()

	let nygmaMachine = {
		x: 5,
		y: 3
	}

	useEffect(() => {
		setPlayer({ x: 0, y: 0 })
		let tempMaze = [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 0, 1, 0, 0],
			[0, 0, 0, 0, 1, 1, 1],
			[1, 0, 1, 1, 1, 0, 0],
			[1, 0, 1, 0, 1, 1, 0],
			[0, 0, 1, 0, 1, 0, 0],
			[0, 1, 1, 0, 1, 0, 1],
			[0, 0, 0, 0, 1, 0, 0],
			[0, 1, 1, 0, 0, 0, 0]
		]
		tempMaze[nygmaMachine.y][nygmaMachine.x] = 2
		setMazeMap(tempMaze)
	}, [
		nygmaMachine.x, nygmaMachine.y
	])

	// make sure player can legally make the move
	const checkMovement = (direction) => {

		let playerTemp = { ...player }
		let playerX = playerTemp.x
		let playerY = playerTemp.y

		if (playerY !== 0 && direction === "up") {
			if (mazeMap[playerY - 1][playerX] === 0 ||
				mazeMap[playerY - 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY - 1 });
			}
		}

		if (playerY !== mazeMap.length - 1 && direction === "down") {
			if (mazeMap[playerY + 1][playerX] === 0 ||
				mazeMap[playerY + 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY + 1 });
			}
		}

		if (direction === "left" && playerX !== 0) {
			if (mazeMap[playerY][playerX - 1] === 0 ||
				mazeMap[playerY][playerX - 1] === 2
			) {
				setPlayer({ x: playerX - 1, y: playerY });
			}
		}

		if (playerX !== mazeMap[0].length - 1 && direction === "right") {
			if (mazeMap[playerY][playerX + 1] === 0 ||
				mazeMap[playerY][playerX + 1] === 2
			) {
				setPlayer({ x: playerX + 1, y: playerY });
			}
		}

	}

	useEffect(() => {
		const handleKeypress = (event) => {
			event.preventDefault()
			if (event.key === "ArrowUp" || event.key === "w") {
				checkMovement("up")
			} else if (event.key === "ArrowDown" || event.key === "s") {
				checkMovement("down")
			} else if (event.key === "ArrowRight" || event.key === "d") {
				checkMovement("right")
			} else if (event.key === "ArrowLeft" || event.key === "a") {
				checkMovement("left")
			}
		}


		// // make sure player can legally make the move
		// const checkMovement = (direction) => {

		// 	let playerTemp = { ...player }
		// 	let playerX = playerTemp.x
		// 	let playerY = playerTemp.y

		// 	if (playerY !== 0 && direction === "up") {
		// 		if (mazeMap[playerY - 1][playerX] === 0 ||
		// 			mazeMap[playerY - 1][playerX] === 2
		// 		) {
		// 			setPlayer({ x: playerX, y: playerY - 1 });
		// 		}
		// 	}

		// 	if (playerY !== mazeMap.length - 1 && direction === "down") {
		// 		if (mazeMap[playerY + 1][playerX] === 0 ||
		// 			mazeMap[playerY + 1][playerX] === 2
		// 		) {
		// 			setPlayer({ x: playerX, y: playerY + 1 });
		// 		}
		// 	}

		// 	if (direction === "left" && playerX !== 0) {
		// 		if (mazeMap[playerY][playerX - 1] === 0 ||
		// 			mazeMap[playerY][playerX - 1] === 2
		// 		) {
		// 			setPlayer({ x: playerX - 1, y: playerY });
		// 		}
		// 	}

		// 	if (playerX !== mazeMap[0].length - 1 && direction === "right") {
		// 		if (mazeMap[playerY][playerX + 1] === 0 ||
		// 			mazeMap[playerY][playerX + 1] === 2
		// 		) {
		// 			setPlayer({ x: playerX + 1, y: playerY });
		// 		}
		// 	}

		// }

		document.addEventListener('keydown', handleKeypress)
		return () => { document.removeEventListener('keydown', handleKeypress) }
	}, [mazeMap, player])



	return (
		<div>
			<div className="wrapper">
				<div className="maze">
					<p>Player x: {player.x}, Player y: {player.y}</p>
					{
						mazeMap.map((row, index) => {
							return (
								<Row
									key={`row${index}`}
									rowValue={row}
									rowIndex={index}
									player={player}
								/>
							)
						})
					}
				</div>
				<div className="directionButtons">
					<div className="topArrow">
						<button
							onClick={(e) => { checkMovement(e.target.value) }}
							value="up"
						>Up</button>
					</div>
					<div className="leftArrow">
						<button onClick={(e) => {
						}}
						>Left</button>
					</div>
					<div className="downArrow">
						<button>Down</button>
					</div>
					<div className="rightArrow">
						<button>Right</button>
					</div></div>
			</div>
			<div className="answerButton">
				{player.x === nygmaMachine.x && player.y === nygmaMachine.y ? (
					<>
						{props.query !== "etc" ? (
							<Link to={`/Results/${props.query}`}>
								<button className="goToResults">Seek the Answer!</button>
							</Link>
						) : (
							<Link to='/Advice'>
								<button className="goToResults">Seek the Answer!</button>
							</Link>
						)
						}
					</>
				) : (
					<>
					</>
				)}
			</div>
		</div>
	)
}


export default Maze;