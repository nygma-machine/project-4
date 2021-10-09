import { useState, useEffect } from 'react';
import Row from './Row.js';
import { Link } from 'react-router-dom'

const Maze = (props) => {

	let mazeMap = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[1, 0, 1, 0, 2, 0, 0],
		[1, 0, 1, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 0]
	]

	let [player,setPlayer] = useState(
		{
			x: 0,
			y: 0
		}		
	) 

	let nygmaMachine = {
		x: 0,
		y: 0
	}

	useEffect(() => {
		window.addEventListener('keydown', (event) => {
			console.log("testing key presses", event.key);
			if (event.key === "ArrowUp" || event.key === "w") {
				checkMovement("up")
			} else if (event.key === "ArrowDown" || event.key === "s") {
				checkMovement("down")
			} else if (event.key === "ArrowRight" || event.key === "d") {
				checkMovement("right")
			} else if (event.key === "ArrowLeft" || event.key === "a") {
				checkMovement("left")
			}
		})
	}, [])
	
	// make sure player can legally make the move
	function checkMovement(direction) {
		
		let x = player.x;
		let y = player.y;
		
		if (direction ==="up") {
			if (mazeMap[y + 1][x] === 0) {
				player.y = player.y + 1;
			}
		}
		
		if (direction ==="down") {
			if (mazeMap[y - 1][x] === 0) {
				player.y = player.y - 1;
			}
		}
		
		if (direction ==="left") {
			if (mazeMap[y][x - 1] === 0) {
				player.x = player.x - 1;
			}
		}
		
		if (direction ==="right") {
			if (mazeMap[y][x + 1] === 0) {
				player.x = player.x + 1;
			}
		}
		
	}

	return (
		<>
			<div className="wrapper test">
				<div className="maze">
					
					{
						mazeMap.map((row, index) => {
							return (
								<Row
									key={`row${index}`}
									rowValue={row}
									rowIndex={index}
								/>
							)
						})
					}
				</div>
				<div>
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
				) :(
					<>
					</>
				) }
				</div>
			</div>
		</>
	)
}
export default Maze;