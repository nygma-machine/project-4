import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import axios from "axios";

const Results = (props) => {

	const { query } = useParams()

	const [advice, setAdvice] = useState([])

	const { question, name } = props

	useEffect(() => {
		axios({
			url: `https://api.adviceslip.com/advice/search/${query}`,
			method: 'GET',
			dataResponse: 'json'
		}).then((res) => {
			const getAdvice = res.data.slips;
			const selectAdvice = random(getAdvice)
			setAdvice(selectAdvice)
		})
	}, [query])

	const random = (array) => {
		const index = Math.floor(Math.random() * array.length)
		return array[index]
	}

	return (
		<>
			<div className="wrapper">
				<div class="results">
					{name !== "" ? (
						<h2>Congratulations {name}! You Have Conquered the Maze</h2>
					) : (
						<h2>Congradulations! You have Conquered the Maze</h2>
					)}
					{question !== " " ? (
						<p>You asked <span>{`"${question}"`}</span></p>
					) : (
						<>
						</>
					)}
					<p>The NYGMA Machine Advises You:</p>
					<p>{advice.advice}</p>
					<Link to='/'>
						<button>Play Again?</button>
					</Link>
				</div>
			</div>
		</>
	)
}
export default Results;


// Get keyword from App.js
// use Keyword as query param in API Call
// Math.floor(Math.random()) function to randomly select 'advice' object
// 'Advice' state to display results on page
// Button with option to play again?