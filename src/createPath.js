const createPath = function() {
    const pathStack = [];
    const startPosition = [0, 0];
    const newPathArray = createMazeWallArray(40 , 20);
    //allows us to mark when the first dead end occurs
    let endOfFirstPath = true;

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

    //checks if a square is beside a path, also where it is checking from
    function checkPathAround(position, checkingFrom = "all" ) {
      const x = position[0];
      const y = position[1];
      //check all eight blocks around possible path block for other path blocks/ outside of maze
      const onBottomRow = y === newPathArray.length - 1;
      const onTopRow =  y === 0;
      const onLeftColumn = x === 0;
      const onRightColumn = x === newPathArray[0].length - 1;

      //each of these values checks if a square around possible path block is a wall or outside of the maze and will have a value of true if there's a wall

      const leftValue = onLeftColumn || newPathArray[y][x - 1] === 1;

      const rightValue = onRightColumn || newPathArray[y][x + 1] === 1;

      const bottomValue =  onBottomRow || newPathArray[y + 1][x] === 1;

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

      //if all surrounding squares are walls/out of the maze, return true
      //need to exclude certain squares on what is passed into the function eg. possibleTopPosition has to exclude the bottomValue b/ our last path square is guaranteed to be there
      if (checkingFrom === "all") {
        return (leftValue && topValue && bottomValue && rightValue && topRightValue && bottomRightValue && topLeftValue && bottomLeftValue);
      }

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
      //this breaks my checkPathAround but I don't know why- I think its how my checkPathAround function is acting

      if (type === "wall") {
        newPathArray[y][x] = 0;
      }
      if (type === "start") {
        newPathArray[y][x] = 2;
      }
      if (type === "end") {
        newPathArray[y][x] = 3;
      }
    }

    
    //start at a wall block, and turn it to path block- push location onto stack
    changeWall(startPosition, "start");
    pathStack.push(startPosition);


    while (pathStack.length !== 0)
    // for (let i = 0; i < 70; i++) 
    {
      //look at all surrounding blocks for blocks that don't touch another path block
      const currentPosition = pathStack[pathStack.length -1];
      const x = currentPosition[0];
      const y = currentPosition[1];

      const possibleTopPosition = [x , y - 1];
      const possibleBottomPosition = [x , y + 1];
      const possibleLeftPosition = [x - 1, y];
      const possibleRightPosition = [x + 1, y];

      const possibleChoices = [];
      //prevent from pushing to possible answers if current position on top row
      // console.log(
      //   "checking top:", checkPathAround(possibleTopPosition, "top"),
      //   "checking bottom:", checkPathAround(possibleBottomPosition),
      // );


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

      // console.log(`possible choices ${i}`, possibleChoices)

      //randomly choose one to turn into a path block- push location onto stack
      if (possibleChoices.length !== 0) {
        const randomIndex = Math.floor(Math.random() * possibleChoices.length);
        const newPathBlock = possibleChoices[randomIndex];
        // console.log(`random index ${i}`, randomIndex)
        // console.log(`newPathBlock ${i}`, newPathBlock);
        changeWall(newPathBlock);
        pathStack.push(newPathBlock);
      } else if (endOfFirstPath === true) {
        changeWall(currentPosition, "end");
        pathStack.pop();
        endOfFirstPath = false;
      } else {
        pathStack.pop();
      }
      //repeat this until no surrounding blocks can be made into path
      //then pop a block off the stack and try this again
      //when the stack is gone, the path is complete
    }
    
    console.log('all done!')
    //when done return new array
    return newPathArray;

//   const mazeArray = createPath();


  //remove these after testing?
  //This doesn't work because arrays inside need to be destructured too or they are passed by reference
  // const mazeArray = createMazeWallArray(4,4);
  // const copy = [...mazeArray];
  // copy[0][0] = "hello";
  // console.log("mazeWallArray", mazeArray);
  // console.log("copy", copy)
}

export default createPath;
