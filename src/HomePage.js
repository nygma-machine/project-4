import { useState } from 'react';

const HomePage = (props) => {
	//set state for all inputs and selects so that we can control our inputs
	const [userName, setUserName] = useState('');
	const [userKeyWord, setUserKeyword] = useState('time');
	const [userQuestion, setUserQuestion] = useState('');

	const handleTopicChange = (event) => {
		setUserKeyword(event.target.value)
	}

	const handleUserName = (event) => {
		setUserName(event.target.value)
	}

	const handleQuestion = (event) => {
		setUserQuestion(event.target.value)
	}

    const showValues = (event) => {
        event.preventDefault();
        console.log(userName);
        console.log(userKeyWord);
        console.log(userQuestion)
    }

	return (
		<>
			<div className="homePage">
				<div className="wrapper">
					<form onSubmit={showValues}>
                        <label htmlFor="userName">Input your Name</label>
                        <input type="text" name="userName" id="userName" value={userName} onChange={handleUserName}/>
                        <label htmlFor="userKeyword"></label>
                        <select name="userKeyword" id="userKeyword" onChange={handleTopicChange} value={userKeyWord}>
                            <option value="time">Time</option>
                            <option value="love">Love</option>
                            <option value="money">Finance</option>
                            <option value="life">Life</option>
                            <option value="etc">Something Else</option>
                        </select>

                        <label htmlFor="userQuestion">What is your Question? </label>
                        <input type="text" name="userQuestion" id="userQuestion" onChange={handleQuestion} value={userQuestion} />
                        <button type="Submit">Submit</button>
				    </form>
                </div>
            </div>
        </>
    )
}
export default HomePage;