import { useState, useEffect, useCallback } from 'react';
import Row from './Row.js';
import { Redirect } from 'react-router-dom'
import createPath from '../utils/createPath.js';
import move from '../sounds/movement.wav'
import wall from '../sounds/hitWall.wav'
import victory from '../sounds/foundNygma.wav'
import trap from '../sounds/hitTrap.wav'
import playAudio from '../utils/PlaySound.js';

const Maze = (props) => {
	// get variables and set functions from props via destructure
	const { mazeDifficulty, score, setScore } = props;

	// set state variables
	const [mazeMap, setMazeMap] = useState([])
	const [player, setPlayer] = useState({ x: 0, y: 0 })
	const [nygmaMachine, setNygmaMachine] = useState({});


	// updates the score by adding the value input
	const updateScore = useCallback((scoreChange) => {
		setScore(score + scoreChange)
	}, [setScore, score])

	// sets up the maze
	useEffect(() => {
		const maze = createPath(20, 20, setNygmaMachine, mazeDifficulty);
		setMazeMap(maze);
	}, [mazeDifficulty])

	// make sure player can legally make the move, and move the player if so
	const checkMovement = useCallback((direction) => {

		// score tracking, subtract points for move attempts
		updateScore(-1)

		let playerTemp = { ...player }
		let playerX = playerTemp.x
		let playerY = playerTemp.y

		// checks if the player can move up, and if so, moves and applies score changes
		if (playerY !== 0 && direction === "up") {
			if (mazeMap[playerY - 1][playerX] === 0 ||
				mazeMap[playerY - 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY - 1 });
				playAudio(move)
			} else if (mazeMap[playerY - 1][playerX] === 3) {
				// score tracking, subtract points for hitting a trap
				updateScore(-10)
				playAudio(trap)
				setPlayer({ x: 0, y: 0 });
			} else {
				// score tracking, subtract points for walking into a wall
				updateScore(-1)
				playAudio(wall)
			}
		}

		// checks if the player can move down, and if so, moves and applies score changes
		if (playerY !== mazeMap.length - 1 && direction === "down") {
			if (mazeMap[playerY + 1][playerX] === 0 ||
				mazeMap[playerY + 1][playerX] === 2
			) {
				setPlayer({ x: playerX, y: playerY + 1 });
				playAudio(move)
			} else if (mazeMap[playerY + 1][playerX] === 3) {
				playAudio(trap)
				// score tracking, subtract points for hitting a trap
				updateScore(-10)
				setPlayer({ x: 0, y: 0 });
			}
			else {
				// score tracking, subtract points for walking into a wall
				updateScore(-1)
				playAudio(wall)
			}
		}

		// checks if the player can move left, and if so, moves and applies score changes
		if (direction === "left" && playerX !== 0) {
			if (mazeMap[playerY][playerX - 1] === 0 ||
				mazeMap[playerY][playerX - 1] === 2
			) {
				setPlayer({ x: playerX - 1, y: playerY });
				playAudio(move)
			} else if (mazeMap[playerY][playerX - 1] === 3) {
				// score tracking, subtract points for hitting a trap
				updateScore(-10)
				playAudio(trap)
				setPlayer({ x: 0, y: 0 });
			}
			else {
				// score tracking, subtract points for walking into a wall
				updateScore(-1)
				playAudio(wall)
			}
		}

		// checks if the player can move right, and if so, moves and applies score changes
		if (playerX !== mazeMap[0].length - 1 && direction === "right") {
			if (mazeMap[playerY][playerX + 1] === 0 ||
				mazeMap[playerY][playerX + 1] === 2
			) {
				setPlayer({ x: playerX + 1, y: playerY });
				playAudio(move)
			} else if (mazeMap[playerY][playerX + 1] === 3) {
				// score tracking, subtract points for hitting a trap
				updateScore(-10)
				playAudio(trap)
				setPlayer({ x: 0, y: 0 });
			}
			else {
				// score tracking, subtract points for walking into a wall
				updateScore(-1)
				playAudio(wall)
			}
		}
	}, [mazeMap, player, updateScore])

	// checks if the player has won by reaching the nygma machine, if so play victory sound
	const checkVictory = () => {
		if (player.x === nygmaMachine.x && player.y === nygmaMachine.y) {
			playAudio(victory)
		}
	}

	// listens for key presses and calls the checkMovement function for a key that represents that direction
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

	// // checks on every render if the user has won
	checkVictory()

	// the jsx for the maze page
	return (
		<div className="wrapper">
			<header className="mazeHeading">
				<h1>In order to achieve true enlightement, you must first prove yourself worthy</h1>
				<p>The NYGMA Machine <span className="nygmaLegend"></span> is located somewhere in this maze. Find it, and you shall receive the answers you so dearly desire</p>
				{
					// Displays explanation of traps with a picture, if it's on hard mode
				mazeDifficulty === 'hard' ? (
					<>
						<p>Make sure to watch out for any traps <span className="trapLegend"></span>, as they will send you all the way back to the start of the maze if you touch them!</p>
					</>
				) : (
					<>
					</>
				)}
			</header>
			<main className="mazeFlex">
				<div className="maze">
					{
						// render the entire maze
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
									{
										// check if the user reached the nygma machine, if so direct them to the appropriate results/advice page
										props.query !== "etc" ? (
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
			</main>
		</div>
	)
}


export default Maze;