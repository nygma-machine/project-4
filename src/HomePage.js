// import { useState } from 'react';
import { Link } from 'react-router-dom'

const HomePage = (props) => {
	//set state for all inputs and selects so that we can control our inputs
	const { setUserName, setUserQuestion, setUserKeyword } = props
	const { userName, userQuestion, userKeyWord } = props

	const handleTopicChange = (event) => {
		setUserKeyword(event.target.value)
	}

	const handleUserName = (event) => {
		setUserName(event.target.value)
	}

	const handleQuestion = (event) => {
		setUserQuestion(event.target.value)
	}

	return (
		<>
			<div className="homePage">
				<div className="wrapper">
					<form onSubmit={props.submitPrompts}>
						<label htmlFor="userName">Input your Name</label>
						<input type="text" name="userName" id="userName" value={userName} onChange={handleUserName} />
						<label htmlFor="userKeyword">What is your Question about?</label>
						<select name="userKeyword" id="userKeyword" onChange={handleTopicChange} value={userKeyWord}>
							<option value="placeholder" disabled>Select One</option>
							<option value="life">Life</option>
							<option value="love">Love</option>
							<option value="parent">Family</option>
							<option value="time">Time</option>
							<option value="money">Finance</option>
							<option value="etc">Something Else</option>
						</select>

						<label htmlFor="userQuestion">What is your Question? </label>
						<input type="text" name="userQuestion" id="userQuestion" onChange={handleQuestion} value={userQuestion} />
						<Link to="/Maze">
							<button type="Submit">Submit</button>
						</Link>
					</form>
				</div>
			</div>
		</>
	)
}
export default HomePage;