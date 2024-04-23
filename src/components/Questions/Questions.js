import React, { useState, useEffect } from 'react';
import './Questions.css';

const Questions = () => {
  const questions = [
    {
      question: 'São tipos de tecido ósseo',
      correctAnswers: ['COMPACTO', 'ESPONJOSO']
    },
    {
      question: 'Classificação histológica dos ossos',
      correctAnswers: ['IMATURO', 'LAMELAR']
    },

    {
      question:'São duas camadas principais dos ossos',
      correctAnswers:['ENDÓSTEO', 'PERIOSTEO']
    },
    {
      question:'Celula responsável pela produção de atriz ossea',
      correctAnswers:['OSTEOBLASTO']
    },
    {
      question:'Principais minerais presentes nos ossos',
      correctAnswers:['CÁLCIO','FÓSFORO']
    },
   
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array.from({ length: questions[currentQuestion]?.correctAnswers.reduce((acc, answer) => acc + answer.length, 0) }, () => ''));
  const [wordGrid, setWordGrid] = useState([]);
  const [currentAnswerIsCorrect, setCurrentAnswerIsCorrect] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const gridSize = wordGrid.length || 8; 

 

  

  useEffect(() => {
    generateWordGrid();
    const initialSelectedAnswers = questions[currentQuestion]?.correctAnswers.reduce((acc, answer) => acc + answer.length, 0);
    setSelectedAnswers(Array.from({ length: initialSelectedAnswers }, () => ''));
    // eslint-disable-next-line
  }, [currentQuestion]);

  const generateWordGrid = () => {
    const longestWordLength = Math.max(...questions[currentQuestion]?.correctAnswers.map(word => word.length));
    const gridSize = Math.max(8, longestWordLength);
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    questions[currentQuestion]?.correctAnswers.forEach((word) => {
      const wordLength = word.length;
      let row, col;
      let tries = 0;
      let direction;

      // Select a random direction: horizontal (0) or vertical (1)
      direction = Math.random() < 0.5 ? 0 : 1;

      do {
        row = Math.floor(Math.random() * gridSize);
        col = Math.floor(Math.random() * gridSize);
        tries++;
        if (tries > 100) return; // Avoid infinite loop
      } while (!canPlaceWord(grid, row, col, wordLength, direction));

      placeWord(grid, row, col, word, direction);
    });

    fillEmptyCells(grid, availableChars);

    console.log('Word Grid:', grid);
    setWordGrid(grid);
  };

  const canPlaceWord = (grid, row, col, length, direction) => {
    if (direction === 0) {
      for (let i = 0; i < length; i++) {
        if (col + i >= grid.length || col + i < 0 || grid[row][(col + i + grid.length) % grid.length] !== '') {
          return false;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (row + i >= grid.length || row + i < 0 || grid[(row + i + grid.length) % grid.length][col] !== '') {
          return false;
        }
      }
    }

    return true;
  };

  const placeWord = (grid, row, col, word, direction) => {
    if (direction === 0) {
      for (let i = 0; i < word.length; i++) {
        grid[row][(col + i + grid.length) % grid.length] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[(row + i + grid.length) % grid.length][col] = word[i];
      }
    }
  };

  const fillEmptyCells = (grid, availableChars) => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '') {
          const randomIndex = Math.floor(Math.random() * availableChars.length);
          grid[row][col] = availableChars[randomIndex];
        }
      }
    }
  };

  const handleAnswerClick = (row, col) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[row * gridSize + col] = wordGrid[row][col];
    setSelectedAnswers(newSelectedAnswers);
    console.log('Clicked Answer:', wordGrid[row][col]);
    if (checkWord()) {
      setCurrentAnswerIsCorrect(true);
      if (currentQuestion === questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };
  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFinalScreen(true);
    }
  };

  const checkWord = () => {
    const correctAnswers = questions[currentQuestion]?.correctAnswers;
    const selectedAnswersArray = selectedAnswers.join('').split('');
    const selectedAnswersSet = new Set(selectedAnswersArray);
    const allCorrectAnswersSelected = correctAnswers.every(answer => {
      const answerSet = new Set(answer.split(''));
      const answerArray = Array.from(answer);
      const selectedAnswerArray = Array.from(selectedAnswersSet).filter(letter => answerArray.includes(letter));
      return answerSet.size === selectedAnswerArray.length && answerArray.every(letter => selectedAnswerArray.includes(letter));
    });
    console.log('All correct answers selected:', allCorrectAnswersSelected);
    return allCorrectAnswersSelected;
  };



  console.log('Selected Answers:', selectedAnswers);
  useEffect(() => {
    if (checkWord()) {
      setCurrentAnswerIsCorrect(true);
      console.log('currentAnswerIsCorrect:', currentAnswerIsCorrect);
    } else {
      setCurrentAnswerIsCorrect(false);
      console.log('currentAnswerIsCorrect:', currentAnswerIsCorrect);
    }
    // eslint-disable-next-line
  }, [selectedAnswers]);

  console.log('currentQuestion:', currentQuestion);
  console.log('currentAnswerIsCorrect:', currentAnswerIsCorrect);
  
  // eslint-disable-next-line
  useEffect(() => {
    if (currentQuestion === questions.length && currentAnswerIsCorrect) {
      setShowFinalScreen(true);
    }
    // eslint-disable-next-line
  }, [currentQuestion, currentAnswerIsCorrect]);
  
  return (
    <div className="questions-container">
      {showFinalScreen && (
        <div className="final-screen">
          <h2 className="final-screen-title">Resultado Final</h2>
          <p className="final-screen-text">Você conquistou o jogo!</p>
          <button className="final-screen-button" onClick={() => setShowFinalScreen(false)}>
            Voltar para o jogo
          </button>
        </div>
      )}
  
      {!showFinalScreen && (
        <>
          <div className="question-background">
            <h2 className="question">{questions[currentQuestion].question}</h2>
          </div>
          <div className="grid-container">
            <div className="word-grid">
              {wordGrid.map((row, rowIndex) => (
                <div key={rowIndex} className="word-grid-row">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`word-grid-cell ${cell && selectedAnswers[rowIndex * gridSize + colIndex]? 'selected' : ''}`}
                      onClick={() => handleAnswerClick(rowIndex, colIndex)}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
  
      {currentAnswerIsCorrect && !showFinalScreen && (
        <button className="next-button" onClick={() => handleNextClick()}>
          Próxima
        </button>
      )}
    </div>
  );
};

export default Questions;
