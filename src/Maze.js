import { useState, useEffect, useCallback } from 'react';
import Row from './Row.js';
import { Redirect } from 'react-router-dom'
import createPath from './createPath.js';
import move from './sounds/movement.wav'
import wall from './sounds/hitWall.wav'
import victory from './sounds/foundNygma.wav'
import trap from './sounds/hitTrap.wav'
import playAudio from './sounds/PlaySound.js';

const Maze = (props) => {
	const {mazeDifficulty} = props;

	const [mazeMap, setMazeMap] = useState([])

	const [player, setPlayer] = useState({x: 0, y: 0})

	const [nygmaMachine, setNygmaMachine] = useState({
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
	}, [mazeDifficulty])



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
				playAudio(move)
			} else if (mazeMap[playerY - 1][playerX] === 3) {
				playAudio(trap)
				setPlayer({x: 0, y: 0});
      } else {
      playAudio(wall)
			}
		}

		if (playerY !== mazeMap.length - 1 && direction === "down") {
			if (mazeMap[playerY + 1][playerX] === 0 ||
				mazeMap[playerY + 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY + 1 });
				playAudio(move)
			} else if (mazeMap[playerY + 1][playerX] === 3) {
				playAudio(trap)
				setPlayer({x: 0, y: 0});
			}
			else {
        playAudio(wall)
			}
		}

		if (direction === "left" && playerX !== 0) {
			if (mazeMap[playerY][playerX - 1] === 0 ||
				mazeMap[playerY][playerX - 1] === 2
			) {
				setPlayer({ x: playerX - 1, y: playerY });
				playAudio(move)
			} else if (mazeMap[playerY][playerX - 1] === 3) {
				playAudio(trap)
				setPlayer({x: 0, y: 0});
			}
			else {
				playAudio(wall)
			}
		}

		if (playerX !== mazeMap[0].length - 1 && direction === "right") {
			if (mazeMap[playerY][playerX + 1] === 0 ||
				mazeMap[playerY][playerX + 1] === 2
			) {
				setPlayer({ x: playerX + 1, y: playerY });
				playAudio(move)
			} else if (mazeMap[playerY][playerX + 1] === 3) {
				playAudio(trap)
				setPlayer({x: 0, y: 0});
			}
			else {
				playAudio(wall)
			}
		}
	}, [mazeMap, player])

	const checkVictory = () => {
		if (player.x === nygmaMachine.x && player.y === nygmaMachine.y ) {
			playAudio(victory)
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

		document.addEventListener('keydown', handleKeypress)
		return () => { document.removeEventListener('keydown', handleKeypress) }
	}, [mazeMap, player, checkMovement])

	checkVictory()

	return (
		<div>
			<div className="wrapper mazeFlex">
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
								<Redirect to={`/Results/${props.query}`}>
								</Redirect>
								) : (
								<Redirect to='/Advice'>
								</Redirect>
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