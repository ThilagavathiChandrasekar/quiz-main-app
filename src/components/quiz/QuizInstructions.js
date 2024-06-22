import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../styles/QuizIns.css';

//icons
import { FaGratipay } from "react-icons/fa";
import {FaLightbulb} from "react-icons/fa";

//images
import answer from '../../assets/img/answer.png';
import options from '../../assets/img/options.png';
import fiftyFifty from '../../assets/img/fiftyFifty.png';
import hints from '../../assets/img/hints.png';


const QuizInstruction = () =>  (

    <Fragment>
        <Helmet> <title>Quiz Instruction</title> </Helmet>
   
    <div className="instruction container">
        <h1 className='quiz-h1'>How to play the game</h1>
        <u><b className='heading2'>Ensure you read this guide from start to finish.</b></u>

        <ul className='browser-default' id='main-list'>

            <li>The game has a duration of 15minutes and ends as soon as your time elapses. </li>
            <li>Each game consists of 15 questions</li>

            <li>
            Every question contains 4options <br />
            <img src={options} className='quiz-ins-image' alt="Quiz App option"   />
            </li>

            <li>
            Select the option which best answers the question by clicking (or selecting) it. <br />
            <img src={answer} className='quiz-ins-image' alt="Quiz App answer"   />
             </li>

             <li>Each game has 2 lifelines namely</li>
                <ul id='sublist'>
                     <li>50-50 changes</li>
                    <li>5Hints</li>
                </ul> 

            <li>
                Selecting a 50-50 lifeline by clicking the icon <span className='lifeline-icon'> <FaGratipay /> </span> will remove 2wrong answers, leaving the correct answer and one.
                <img src={fiftyFifty} className='quiz-ins-image' alt='Quiz app fifty fifty'   />
            </li>

            <li>
                 Using a hint by clicking the icon 
                 <span className='lifeline-icon'><FaLightbulb /> </span>
                 will remove one wrong answer leaving wrong tow wrong answers and one correct answer. You can use as many hints as possible on a single question.
                <br />
                <img src={hints} className='quiz-ins-image' alt="hints"   />
            </li>

            <li>Feel free to quit (or retire from) the game at any time. In that case your score will be revealed afterwords.</li>
            <li>The timer starts as soon as the games loods</li>
            <li>Lets do this if you think you've got what it takes?</li>
        </ul>

        <div className='footer-link'>
             <Link to='/' className='footer-button'>No take me back</Link> 
          <Link to='/play/quiz' className='footer-button'>Okay. Let's do this!</Link>
        </div>

    </div>
    </Fragment>

  );


export default QuizInstruction;