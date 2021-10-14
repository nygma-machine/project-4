import {Link as ScrollLink} from 'react-scroll';
import { useHistory } from 'react-router-dom'
// import { useEffect } from 'react/cjs/react.development'

import questionMark from '../questionMark.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

const HomePage = (props) => {
	// Deconstruct all 'state' props
	const { userName, userQuestion, userKeyWord, mazeDifficulty } = props;
	// Deconstruct all "Handle..." functions
	const {handleName, handleKeyWord, handleQuestion, handleDifficulty} = props;
	let history = useHistory()

	const startMaze = (event) => {
		event.preventDefault();
		history.push('/Maze')
	}


	return (
		<>
			<main className="homePage">
				<header className="headerFlex wrapper">
					<div className="siteHeading">
						<h1>The <span>Nygma</span> Machine</h1>
						<p>What astounds man, but challenges mice? Has an ear that cannot hear, and a heart that only the clever beat?
						</p>
					</div>
					<div className="imgContainer">
						<img src={questionMark} alt="" />
					</div>
					<ScrollLink 
						className="downArrow"
						to="description"
						smooth={true}
						duration={700}
					>
						<span className="sr-only">Go to Description</span>
						<FontAwesomeIcon className="icon" icon={faChevronCircleDown} />
					</ScrollLink>
				</header>

				<div className="wrapper">
					<p className="description" id="description">Are you esurient for enlightnment? Have an insatiable appetite for information? Craving knowledge? The <span>nygma</span> Machine can provide all the answers. But first, you must prove yourself worthy...</p>
					{/* Form that takes UserInput */}
					<form onSubmit={startMaze}>
						<fieldset>
							<label htmlFor="userName">What is your name?</label>
							<input type="text" name="userName" id="userName" value={userName} onChange={handleName} />
						</fieldset>
						{/* Values are passed to userKeyword state that is passed as props to /Results and /Advice components */}
						<fieldset>
							<label htmlFor="userKeyword">What do you wish to learn about?</label>
							<select name="userKeyword" id="userKeyword" onChange={handleKeyWord} value={userKeyWord}>
								<option value="etc" disabled>Select One</option>
								<option value="life">Life</option>
								<option value="love">Love</option>
								<option value="parent">Family</option>
								<option value="time">Time</option>
								<option value="money">Finances</option>
								<option value="etc">Something Else</option>
							</select>
						</fieldset>
						<fieldset>
							<label htmlFor="userQuestion">What do you want to ask <span>The Nygma Machine</span>? </label>
							<input type="text" name="userQuestion" id="userQuestion" onChange={handleQuestion} value={userQuestion} />
						</fieldset>
						<fieldset>
							<div className="radioButton">
								<label 
									htmlFor="easy"
								>Easy </label>
								<input 
									name="mazeDifficulty"
									type="radio" 
									value="easy"
									id="easy"
									onChange={handleDifficulty}
									checked={mazeDifficulty === "easy"}
								/>
							</div>

							<div className="radioButton">
								<label 
									htmlFor="medium"
								>Medium </label>
								<input 
									name="mazeDifficulty"
									type="radio" 
									value="medium"
									id="medium"
									onChange={handleDifficulty}
									checked={mazeDifficulty === "medium"}
								/>
							</div>

							<div className="radioButton">
								<label 
									htmlFor="hard"
								>Hard </label>
								<input 
									name="mazeDifficulty"
									type="radio" 
									value="hard"
									id="hard"
									onChange={handleDifficulty}
									checked={mazeDifficulty === "hard"}
								/>
							</div>
							
						</fieldset>
						<button className="buttonLink" type="Submit">Submit</button>
					</form>
				</div>
			</main>
		</>
	)
}
export default HomePage;