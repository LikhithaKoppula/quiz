import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
function Level2(props) {
    //console.log(props.dataToNext)
    const questions = [
		{
			"question": ' Who is the father of C language? ',
			"options": ['James Gausling','Guido Van Rossum','Dennis Ritchie','Bjarne Stroustrup'],"answer":"Dennis Ritchie" },
		{
			"question": ' Which of the following is not a valid C variable name?',
			"options": ['int number ','float rate','int variable_count', 'int $main'],"answer":"int $main" },
		{
			"question": ' All keywords in C are in ____________y?',
			"options": ['Lowercase','Uppercase','Camelcase','None'], "answer":"Lowercase"},
		{
			"question": ' Which of the following cannot be a variableSorry ! You are Not Qualified for Level 2 Please Try Again !! name in C?',
			"options": ['Volatile','True', 'Friends', 'Export'], "answer":"Volatile" },
        {
			"question": ' What is the result of logical or relational expression in C?',
			"options": ['True or False', '0 or 1', '0 if an expression is false and any positive number if an expression is true', 'None'], "answer":"0 or 1" },
		{
			"question": ' What is an example of iteration in C',
			"options": ['For','While','Do-While', 'All of the above'],"answer":"All of the above" },
        {
        "question": ' Functions in C Language are always _________',
        "options": ['External','Internal','Both internal and external','External and Internal are not valid terms for functions',],"answer":"External" },
        {
        "question": ' What is #include <stdio.h>?',
        "options": ['File inclusion directive','Inclusion directive','Preprocessor directive', 'None'],"answer":"Preprocessor directive" },
        {
			"question": ' Which of the following return-type cannot be used for a function in C?',
			"options": ['Char*','Struct','Void','None'], "answer":"None" },
        {
			"question": ' What is the sizeof(char) in a 32-bit C compiler?',
			"options": ['1 bit', '2 bit', '1 byte', '2 byte'], "answer":"1 byte"}
    ];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [option, setoption] = useState("");
    const [level, setlevel] = useState(1)
    const check = () => {
        const answer = option
        if (answer == questions[currentQuestion]['answer']) {
            setScore(score + 1)
        }
        if (currentQuestion + 1 < questions.length)
            setCurrentQuestion(currentQuestion + 1);
        else {
            setShowScore(true);
            const percentage = (score / questions.length) * 100
            console.log(score,percentage);
            if (percentage >= 60) {
                setlevel(2)
            }
        }

    }
    const setCurrentOption = (e) => {
        setoption(e.target.value)
        console.log(e.target.value);
    }
    return (
        <>

            <div>
                {showScore ? (<div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>) : (
                    <>
                        <h2>Welcome to {props.dataToNext} quiz Level {level}</h2>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].question}</div>
                        </div>
                        {questions[currentQuestion].options.map((answerOption, index) => (
                            <> <div className="form-check">
                                <input className="form-check-input" onChange={setCurrentOption} type="radio" name="radio" value={answerOption}></input>
                                <label className="form-check-label" for={index} >{answerOption}</label>
                            </div>
                            </>
                        ))}
                        <button ClassName="btn btn-primary" onClick={check}>Next</button>
                    </>
                )
                }
            </div>
        </>
    )
}

export default Level2