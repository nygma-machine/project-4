import Block from './Block.js'

const Row = ({rowValue, rowIndex}) => {
	return (
		<div
            key={`row${rowIndex}`}
            className="row"
        >
            {
                rowValue.map((block, index) => {
					return (
						<Block
                        
                        />
					)
                })
            }
		</div>
	)
}

export default Row;
