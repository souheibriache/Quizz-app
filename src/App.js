import React, {useReducer, useState} from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';
import {FacebookShareButton, FacebookIcon , TwitterShareButton , TwitterIcon , InstapaperShareButton , InstapaperIcon} from "react-share";
import emoji from 'react-easy-emoji'

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';
import Timer from './components/Timer';

function App() {
    const questions = [
        {
            id: 1,
            question: 'Which statement about Hooks is not true?',
            answer_a:
                'Hooks are 100% backwards-compatible and can be used side by side with classes',
            answer_b: 'Hooks are still in beta and not available yet',
            answer_c:
                "Hooks are completely opt-in, there's no need to rewrite existing code",
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: 'Which one is not a Hook?',
            answer_a: 'useState()',
            answer_b: 'useConst()',
            answer_c: 'useReducer()',
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 3,
            question: 'What Hook should be used for data fetching?',
            answer_a: 'useDataFetching()',
            answer_b: 'useApi()',
            answer_c: 'useEffect()',
            answer_d: 'useRequest()',
            correct_answer: 'c',
        },
    ];
    const [score , setScore] = useState(0)
    const initialState = {
        questions,
        currentQuestion: 0,
        currentAnswer: '',
        answers: [],
        showResults: false,
        error: '',
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);
    const {currentQuestion, currentAnswer, answers, showResults, error} = state;

    const question = questions[currentQuestion];

    const renderError = () => {
        if (!error) {
            return;
        }

        return <div className="error">{error}</div>;
    };

    const renderResultMark = (question, answer) => {
        if (question.correct_answer === answer.answer) {
            return <span className="correct">Correct</span>;
        }

        return <span className="failed">Failed</span>;
    };

    const renderResultsData = () => {
        let emoji = '';
        switch (score) {
            case 0 : 
                emoji = "😥";
                break
             case 1 : 
                emoji = "😐";
                break
             case 2 : 
                emoji = "😃";
                break
             case 3 : 
                emoji = "😎";
                break
        }
        return (
            <div>
                {emoji}
               <h4>you had {score}/{questions.length}</h4>
            </div>
        );
    };

    const restart = () => {
        dispatch({type: RESET_QUIZ});
        setScore(0)
    };

    
    //if(showresults)
    if (showResults) {
        return (
            <div className="container results">
                <h2>Results</h2>
                <ul>{renderResultsData()}</ul>
                share yout result
                <div className="social__share__buttons" >

                
                <FacebookShareButton 
                    url={"https://cookvuz-quiz.web.app/"}
                    quote={"i had "+score+" IQ level, try it yourself"}
                    hashtag="#cookvuz_quiz"
                    //className={classes.socialMediaButton}
                    >
                 <FacebookIcon size={36} />
              </FacebookShareButton>

              <TwitterShareButton 
                    url={"https://cookvuz-quiz.web.app/"}
                    quote={"i had "+score+" IQ level, try it yourself"}
                    hashtag="#cookvuz_quiz"
                    //className={classes.socialMediaButton}
                    >
                 <TwitterIcon size={36} />
              </TwitterShareButton>

              <InstapaperShareButton 
                    url={"https://cookvuz-quiz.web.app/"}
                    quote={"i had "+score+" IQ level, try it yourself"}
                    hashtag="#cookvuz_quiz"
                    //className={classes.socialMediaButton}
                    >
                 <InstapaperIcon size={36} />
              </InstapaperShareButton>
              </div>
                <button className="btn btn-primary" onClick={restart}>
                    Restart
                </button>
            </div>
        );
    } else {
        return (
            <QuizContext.Provider value={{state, dispatch }}>
                <div className="container">
                    <div className="quiz__progres">
                    <Timer/>
                    <h4>score : {score}</h4>
                    <Progress
                        total={questions.length}
                        current={currentQuestion + 1}
                    />
                    </div>
                    
                    <Question />
                    {renderError()}
                    <Answers setScore={setScore}/>
                    {/* <button className="btn btn-primary" >
                        Confirm and Continue
                    </button> */}
                </div>
            </QuizContext.Provider>
        );
    }
}

export default App;
