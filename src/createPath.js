//this function creates an array of arrays representing the maze. Starting with a maze full of walls, it uses a randomized depth-first search algorithm (https://en.wikipedia.org/wiki/Maze_generation_algorithm) to create paths throughout the maze.
	//1.creates a maze full of walls
	//2. changes a start location to a path, and then pushes its position onto pathStack array as a set of coordinates
	//3. while loop checks the last item in our pathStack array- checks if any of the squares around it (top, bottom, left, right) are wall squares
	//4. If so, it randomly selects one of them to turn into a path square, then pushes its position onto the pathStack
		//The while loop then checks the next square as it is the last item in pathStack
	//5. If there are not any squares around it that can be turned into paths (top, bottom, left, right), it pops that position off the stack, and the while loop checks the previous position
	//6. this repeats until it is impossible to create any more path squares, and the stack is empty

const createPath = function (mazeWidth, mazeHeight, setNygmaMachine) {
	const pathStack = [];
	const startPosition = [0, 0];
	const newPathArray = createMazeWallArray(mazeWidth, mazeHeight);

	//creates basic maze full of walls
	function createMazeWallArray(width, height) {
		let mazeWallArray = [];
		//let rowArray =[]; and subsequent loop cannot be in here because then a reference to the same rowArray instance is created for each row in the mazeWallArray. This means that if any function changes an item in one row it will change them in all of them


		//pushes rowArray onto mazeArray
		for (let i = 0; i < height; i++) {
			//generates our rowArray, needs to be inside to ensure that all rowArrays are new instances 
			let rowArray = [];
			for (let i = 0; i < width; i++) {
				rowArray.push(1);
			}
			mazeWallArray.push(rowArray);
		}

		return mazeWallArray;
	};

	//this function is used to check the four squares around the currentPosition in our while loop to see if they are beside a path
	function checkPathAround(position, checkingFrom = "all") {
		const x = position[0];
		const y = position[1];
		
		const onBottomRow = y === newPathArray.length - 1;
		const onTopRow = y === 0;
		const onLeftColumn = x === 0;
		const onRightColumn = x === newPathArray[0].length - 1;

		//each of these values checks if a square around possible path block is a wall or outside of the maze and will have a value of true if there's a wall / outside of the maze

		const leftValue = onLeftColumn || newPathArray[y][x - 1] === 1;

		const rightValue = onRightColumn || newPathArray[y][x + 1] === 1;

		const bottomValue = onBottomRow || newPathArray[y + 1][x] === 1;

		const bottomLeftValue =
			onBottomRow ||
			onLeftColumn ||
			newPathArray[y + 1][x - 1] === 1;

		const bottomRightValue =
			onBottomRow ||
			onRightColumn ||
			newPathArray[y + 1][x + 1] === 1;


		const topValue = onTopRow || newPathArray[y - 1][x] === 1;

		const topLeftValue =
			onTopRow ||
			onLeftColumn ||
			newPathArray[y - 1][x - 1] === 1;

		const topRightValue =
			onTopRow ||
			onRightColumn ||
			newPathArray[y - 1][x + 1] === 1;

		//checks the squares around position based on its location relative to currentPosition
		if (checkingFrom === "top") {
			return (leftValue && topValue && rightValue && topRightValue && topLeftValue);
		}

		if (checkingFrom === "bottom") {
			return (leftValue && bottomValue && rightValue && bottomRightValue && bottomLeftValue);
		}
		if (checkingFrom === "left") {
			return (leftValue && topValue && bottomValue && topLeftValue && bottomLeftValue);
		}
		if (checkingFrom === "right") {
			return (topValue && bottomValue && rightValue && topRightValue && bottomRightValue);
		}

	}

	function changeWall(position, type = "wall") {
		const x = position[0];
		const y = position[1];

		if (type === "wall") {
			newPathArray[y][x] = 0;
		}
		if (type === "nygma") {
			newPathArray[y][x] = 2;
		}
	}


	//start at a wall block, and turn it to path block- push location onto stack
	changeWall(startPosition, "wall");
	pathStack.push(startPosition);


	while (pathStack.length !== 0)
	// for (let i = 0; i < 70; i++) 
	{
		//look at all surrounding blocks for blocks that don't touch another path block
		const currentPosition = pathStack[pathStack.length - 1];
		const x = currentPosition[0];
		const y = currentPosition[1];

		const possibleTopPosition = [x, y - 1];
		const possibleBottomPosition = [x, y + 1];
		const possibleLeftPosition = [x - 1, y];
		const possibleRightPosition = [x + 1, y];

		const possibleChoices = [];

		//each of these conditions checks that the possible position is not a path, that it is not outside of the maze, and that no other squares around it are paths
		if (y !== 0 && newPathArray[y - 1][x] === 1 && checkPathAround(possibleTopPosition, "top")) {
			possibleChoices.push(possibleTopPosition);
		}
		if (y !== newPathArray.length - 1 && newPathArray[y + 1][x] === 1 && checkPathAround(possibleBottomPosition, "bottom")) {
			possibleChoices.push(possibleBottomPosition);
		}
		if (x !== 0 && newPathArray[y][x - 1] === 1 && checkPathAround(possibleLeftPosition, "left")) {
			possibleChoices.push(possibleLeftPosition);
		}
		if (x !== newPathArray[0].length - 1 && newPathArray[y][x + 1] === 1 && checkPathAround(possibleRightPosition, "right")) {
			possibleChoices.push(possibleRightPosition);
		}

		//randomly choose one to turn into a path block- push location onto pathStack
		if (possibleChoices.length !== 0) {
			const randomIndex = Math.floor(Math.random() * possibleChoices.length);
			const newPathBlock = possibleChoices[randomIndex];
			changeWall(newPathBlock);
			pathStack.push(newPathBlock);
		} else {
			pathStack.pop();
		}
		//repeat this until no surrounding blocks can be made into path
		//then pop a block off the stack and try this again
		//when the stack is gone, the path is complete        
	}

//check 3 x 3 square of values in bottom right corner of PathArray for a path block to change into the nygma machine
	//create an array of possible values from 3 x 3 array

	function checkIfPossible() {
		const possibleNygmaPosition = [];    
		const rightColumn = mazeWidth - 1;
		const bottomRow = mazeHeight - 1;
		//checks each of the nine spots to see if they are a path, if so it pushes that spot onto possibleNygmaPosition
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (newPathArray[bottomRow - j][rightColumn - i] === 0) {
					possibleNygmaPosition.push([rightColumn - i, bottomRow]);
				}

			}
		}

		//randomly selects a position from possibleNygmaPosition and calls setNygmaMachine using it
		const randomIndex = Math.floor(Math.random() * possibleNygmaPosition.length);

		if (possibleNygmaPosition.length !== 0) {
			const nygmaCoordinates = possibleNygmaPosition[randomIndex];
			console.log("possible locations:", possibleNygmaPosition)
			changeWall(nygmaCoordinates, "nygma");
			setNygmaMachine({
				x: nygmaCoordinates[0],
				y: nygmaCoordinates[1]
			})
		}
	}

	checkIfPossible();

	//when done return new array
	return newPathArray;
}

export default createPath;
