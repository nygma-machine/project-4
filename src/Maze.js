import { useState, useEffect, useCallback } from 'react';
import Row from './Row.js';
import { Link } from 'react-router-dom'
import createPath from './createPath.js';
import hitWall from './sounds/SoundWall.js';
import playerMove from './sounds/SoundMove.js';
import playerWins from './sounds/SoundVictory.js';

const Maze = (props) => {
	const {mazeDifficulty} = props;

	const {mazeDifficulty} = props

	const [mazeMap, setMazeMap] = useState([])

	const [player, setPlayer] = useState({x: 0, y: 0})

	const [nygmaMachine, setNygmaMachine] =useState({
		x: 5,
		y: 3
	});


	useEffect(() => {
		// let tempMaze = [
		// 	[0, 0, 0, 0, 0, 0, 0],
		// 	[0, 1, 1, 0, 1, 0, 0],
		// 	[0, 0, 0, 0, 1, 1, 1],
		// 	[1, 0, 1, 1, 1, 0, 0],
		// 	[1, 0, 1, 0, 1, 1, 0],
		// 	[0, 0, 1, 0, 1, 0, 0],
		// 	[0, 1, 1, 0, 1, 0, 1],
		// 	[0, 0, 0, 0, 1, 0, 0],
		// 	[0, 1, 1, 0, 0, 0, 0]
		// ]
		// tempMaze[nygmaMachine.y][nygmaMachine.x] = 2
		// setMazeMap(tempMaze)
		const maze = createPath(20, 20, setNygmaMachine, mazeDifficulty);
		setMazeMap(maze);
	}, [])

	// make sure player can legally make the move, and move the player if so
	const checkMovement = useCallback((direction) => {

		let playerTemp = { ...player }
		let playerX = playerTemp.x
		let playerY = playerTemp.y

		if (playerY !== 0 && direction === "up") {
			if (mazeMap[playerY - 1][playerX] === 0 ||
				mazeMap[playerY - 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY - 1 });
				playerMove()
			} else {
				hitWall()
			}
		}

		if (playerY !== mazeMap.length - 1 && direction === "down") {
			if (mazeMap[playerY + 1][playerX] === 0 ||
				mazeMap[playerY + 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY + 1 });
				playerMove()
			} else {
				hitWall()
			}
		}

		if (direction === "left" && playerX !== 0) {
			if (mazeMap[playerY][playerX - 1] === 0 ||
				mazeMap[playerY][playerX - 1] === 2
			) {
				setPlayer({ x: playerX - 1, y: playerY });
				playerMove()
			} else {
				hitWall()
			}
		}

		if (playerX !== mazeMap[0].length - 1 && direction === "right") {
			if (mazeMap[playerY][playerX + 1] === 0 ||
				mazeMap[playerY][playerX + 1] === 2
			) {
				setPlayer({ x: playerX + 1, y: playerY });
				playerMove()
			} else {
				hitWall()
			}
		}
	}, [mazeMap, player])



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

		document.addEventListener('keydown', handleKeypress)
		return () => { document.removeEventListener('keydown', handleKeypress) }
	}, [mazeMap, player, checkMovement])

	if (player.x === nygmaMachine.x && player.y === nygmaMachine.y ) {
		playerWins()
	}

	return (
		<div>
			<div className="wrapper">
				<div className="maze">
					{
						mazeMap.map((row, index) => {
							return (
								<Row
									key={`row${index}`}
									rowValue={row}
									rowIndex={index}
									player={player}
									mazeDifficulty={mazeDifficulty}
								/>
							)
						})
					}
					{player.x === nygmaMachine.x && player.y === nygmaMachine.y ? 
					(
							<>
								{props.query !== "etc" ? (
								<Link to={`/Results/${props.query}`}>
									<button className="answerButton">Seek the Answer!</button>
								</Link>
								) : (
								<Link to='/Advice'>
									<button className="answerButton">Seek the Answer!</button>
								</Link>
								)
								}
							</>
						) : (
							<>
							</>
						)}
				</div>
				<div className="buttonContainer">
					<div className="topArrow">
						<button className="keyButton"
							onClick={(e) => { checkMovement(e.target.value) }}
							value="up"
						>Up</button>
					</div>
					<div className="leftArrow">
						<button className="keyButton"
							onClick={(e) => { checkMovement(e.target.value) }}
							value="left"
						>Left</button>
					</div>
					<div className="downArrow">
						<button className="keyButton"
							onClick={(e) => { checkMovement(e.target.value) }}
							value="down"
						>Down</button>
					</div>
					<div className="rightArrow">
						<button className="keyButton"
							onClick={(e) => { checkMovement(e.target.value) }}
							value="right"
						>Right</button>
					</div></div>
			</div>
		</div>
	)
}


export default Maze;