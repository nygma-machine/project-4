import Block from './Block.js'

const Row = ({rowValue, rowIndex, player, mazeDifficulty}) => {
	return (
		<div
            key={`row${rowIndex}`}
            className="row"
        >
            {
                rowValue.map((block, index) => {
					return (
						<Block
                            key={`block${index} in row${rowIndex}`}
                            blockValue={block}
                            y={rowIndex}
                            x={index}
							player={player}
							mazeDifficulty={mazeDifficulty}
                        />
					)
                })
            }
		</div>
	)
}

export default Row;
