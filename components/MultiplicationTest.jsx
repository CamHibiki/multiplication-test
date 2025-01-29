"use client"

import React, { useState, useEffect } from 'react';
import Button from './ui/button';
import Input from './ui/input';
import Card from './ui/card';
import Alert from './ui/alert';

const QUESTIONS_COUNT = 25;
const TIME_PER_QUESTION = 10;

const MultiplicationTest = () => {
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [finished, setFinished] = useState(false);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < QUESTIONS_COUNT; i++) {
      const num1 = Math.floor(Math.random() * 8) + 2;
      const num2 = Math.floor(Math.random() * 8) + 2;
      newQuestions.push({
        num1,
        num2,
        correct: num1 * num2
      });
    }
    return newQuestions;
  };

  const startTest = () => {
    setQuestions(generateQuestions());
    setStarted(true);
    setTimeLeft(TIME_PER_QUESTION);
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  const checkAnswer = () => {
    if (parseInt(answer) === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setAnswer('');
    
    if (currentQuestion + 1 >= QUESTIONS_COUNT) {
      setFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(TIME_PER_QUESTION);
    }
  };

  useEffect(() => {
    let timer;
    if (started && !finished) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            checkAnswer();
            return TIME_PER_QUESTION;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished, currentQuestion]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && answer !== '') {
      checkAnswer();
    }
  };



const submitScore = async () => {
  try {
    const scoreData = {
      name: userName,
      score: score,
      totalQuestions: QUESTIONS_COUNT,
      timestamp: new Date().toISOString()
    };
    
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit score');
    }
  } catch (error) {
    console.error('Error submitting score:', error);
  }
};

  return (
    <Card className="max-w-lg mx-auto bg-white">
      {showNameInput ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Enter Your Name</h2>
          <div className="mb-4">
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-64 text-center text-lg text-black border-2 mb-4"
              placeholder="Your name"
            />
          </div>
          <Button 
            onClick={() => {
              if (userName.trim()) {
                setShowNameInput(false);
              }
            }} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!userName.trim()}
          >
            Continue
          </Button>
        </div>
      ) : !started ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Multiplication Test</h2>
          <p className="mb-4 text-black">
            Time per question: {TIME_PER_QUESTION} seconds<br/>
            Total questions: {QUESTIONS_COUNT}
          </p>
          <Button onClick={startTest} className="bg-blue-600 hover:bg-blue-700">
            Start
          </Button>
        </div>
      ) : finished ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Test Complete</h2>
          <p className="text-lg mb-4 text-black">
            Thank you for completing the test.
          </p>
          <Button 
            onClick={() => {
              submitScore();
              setShowNameInput(true);
              setUserName('');
            }} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Finish
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-black">Question {currentQuestion + 1}/{QUESTIONS_COUNT}</span>
            <span className="text-lg font-semibold text-black">{timeLeft}s</span>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-3xl font-bold mb-4 text-black">
              {questions[currentQuestion].num1} × {questions[currentQuestion].num2} = ?
            </p>
            <div className="flex gap-2 justify-center">
              <Input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-24 text-center text-lg text-black border-2"
                autoFocus
              />
              <Button 
                onClick={checkAnswer}
                disabled={answer === ''}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </Button>
            </div>
          </div>

          <Alert type="info" className="text-black bg-blue-50 border-blue-500">
            Press Enter to submit your answer
          </Alert>
        </div>
      )}
    </Card>
  );
};

export default MultiplicationTest;