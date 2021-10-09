import { useEffect } from 'react';
import Row from './Row.js';

const Maze = () => {

	let mazeMap = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[1,0,1,0,0],
		[0,0,1,0,0],
		[0,1,1,0,0]
	]

	let player = {
		x: 0,
		y: 0
	}

	let nygmaMachine = {
		x: 4,
		y: 4
	}

	useEffect(() => {
		window.addEventListener('keydown', (event) => {
			console.log("testing key presses", event.key);
			if (event.key === "ArrowUp") {
				console.log("do stuff up");
			}
		})
	}, [])

	return (
		<>
			<div className="wrapper">
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
			</div>
		</>
	)
}
export default Maze;