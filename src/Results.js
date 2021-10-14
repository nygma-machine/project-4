import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom'
import axios from "axios";
import HallOfFame from "./HallOfFame";

const Results = (props) => {
	// set 'query' as useParams() variable
	const { query } = useParams()

	// set a state that will render the data gathered from the advice API
	const [advice, setAdvice] = useState([])

	// deconstruct props passed in from App.js
	const { question, name, difficulty, hallOfFame, score, newGame, setNewGame, resetForm } = props

	// create a variable for useHistory()
	let history = useHistory()

	// API Call to gather data from advice API using the user's keyword as the search param
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

	// "random" function to select a random index# from array, which will then select a random piece of advice to display
	const random = (array) => {
		const index = Math.floor(Math.random() * array.length)
		return array[index]
	}

	// When user selects 'play again' button, redirect to main page, switch the newGame state, and clear all input data from form
	const playAgain = () => {
		history.push('/')
		setNewGame(!newGame)
		resetForm()
	}

	return (
		<>
			<div className="wrapper">
				<div className="resultsFlex">
					<div className="results">
						{/* Depending on whether the user enters their name, asks a question, etc., render the correct phrase*/}
						{name !== "" ? (
							<div className="congrats">
								<h2>Congratulations {name}! You Have Conquered the Maze</h2>
								{/* if the difficulty was set to 'easy', make the following statement grammatically correct */}
								{difficulty === "easy" ? (
									<h2>That was an {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								) : (
									<h2>That was a {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								)}
							</div>
						) : (
							<div className="congrats">
								<h2>Congratulations! You have Conquered the Maze</h2>
								{difficulty === "easy" ? (
									<h2>That was an {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								) : (
									<h2>That was a {difficulty} maze.  You received a score of {score} based on your efficiency.</h2>
								)}
							</div>
						)}
						{question !== "" ? (
							<p className="repeatQuestion">You asked <span>{`"${question}"`}</span></p>
						) : (
							<p className="repeatQuestion">You chose to not ask a Quesion...</p>
						)}
						<h3 className="adviceHead">The NYGMA Machine Advises You:</h3>
						<p className="advice">{advice.advice}</p>
						<button className="repeatGame" onClick={playAgain}>Play Again?</button>
					</div>
					{/* display HallofFame component with the leaderboard, user's name, and user's score passed in as props */}
					<HallOfFame 
						hallOfFame={hallOfFame} 
						name={name} 
						score={score} 
					/>
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