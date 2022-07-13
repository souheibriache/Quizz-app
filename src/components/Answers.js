import React, {useContext, useState} from 'react';
import Answer from './Answer';
import QuizContext from '../context/QuizContext';
import { SET_ERROR, SET_ANSWERS, SET_CURRENT_ANSWER, SET_CURRENT_QUESTION, SET_SHOW_RESULTS } from '../reducers/types';
import AlertMessage from './AlertMessage';

function Answers({setScore}) {
    const {state, dispatch } = useContext(QuizContext);
    const {currentAnswer, currentQuestion, questions} = state;
    const question = questions[currentQuestion];
    const [popup, setpopup] = useState({
        alertMessage: "Correct",
        success: false,
        popup: false,
      });

      const setVisible = () => {
        setpopup({
          popup: !popup,
        });
      };
    const next = (questionId , currentAnswer ) => {
        //const answer = {questionId: question.id, answer: currentAnswer};

        if (!currentAnswer) {
            dispatch({type: SET_ERROR, error: 'Please select an option'});
            return;
        }
        let answers = state.answers
        answers.push(currentAnswer);
        dispatch({type: SET_ANSWERS, answers});
        
        if(question.correct_answer === currentAnswer) {
            setScore(score => score+1)
            setpopup({
                alertMessage : 'Good job',
                success : true,
                popup : true
            })
        }else{
            setpopup({
                alertMessage : 'Hard luck',
                success : false,
                popup : true
            })
        }
        console.log('question' , question)
        console.log('current answer' , currentAnswer)
        

        
    };
    return (
        <>
        <AlertMessage popup={popup} setVisible={() => setVisible()} />
            <Answer
                next={next}
                letter="a"
                answer={question.answer_a}
                dispatch={dispatch}
                selected={currentAnswer === 'a'}
            />
            <Answer
            next={next}
                letter="b"
                answer={question.answer_b}
                dispatch={dispatch}
                selected={currentAnswer === 'b'}
            />
            <Answer
            next={next}
                letter="c"
                question={question}
                answer={question.answer_c}
                dispatch={dispatch}
                selected={currentAnswer === 'c'}
            />
            <Answer
            next={next}
                letter="d"
                answer={question.answer_d}
                dispatch={dispatch}
                selected={currentAnswer === 'd'}
            />
        </>
    );
}

export default Answers;
