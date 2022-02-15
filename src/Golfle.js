import React, { useEffect, useState, useRef } from 'react';
import styles from './Golfle.module.scss'
import KeyBoard from './KeyBoard.js'

const SCORE_COUNT = 9;
const GUESS_COUNT = 6;
const SOLUTION_COURSE = [3, 4, 4, 5, 4, 5, 3, 4, 4];
const SOLUTION = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PLAYING = 0;
const WON = 1;
const LOST = 2;

// Main app
function Golfle() {
  const coursePar = SOLUTION_COURSE.reduce((sum, holePar) => sum + holePar, 0);
  const score = SOLUTION.reduce((sum, holeScore) => sum + holeScore, 0);
  const [submittedGuesses, setSubmittedGuesses] = useState([]);
  const [guess, setGuess] = useState([]);

  // First determine whether we won already - everything else depends on this -.-
  let win = PLAYING;

  if(submittedGuesses.length > 0) {
    win = WON;
    
    submittedGuesses[submittedGuesses.length - 1].forEach((v, i) => {
      if(v !== SOLUTION[i]) {
        win = LOST;
      }
    });
  }

  // If we haven't won but still have guesses left, keep playing
  if(submittedGuesses.length < GUESS_COUNT && win === LOST) {
    win = PLAYING;
  }

  function keyPressed(key) {
    // Delete a letter
    if(key === 'Backspace') {
      setGuess((prev) => {
        const temp = [...prev];
        temp.pop();
        return temp;
      });
      return;
    }

    // Submit input
    if(key === 'Enter' && guess.length === SCORE_COUNT) {
      setSubmittedGuesses(p => [...p, guess]);
      setGuess([]);
      return;
    }

    // Check if input is a number
    if(!isFinite(key)) {
      // Ignore anything that is not a number
      return;
    }
      
    if(guess.length < SCORE_COUNT) {
      setGuess((prev) => [...prev, parseInt(key)]);
    }
  }

  // Listen for user key down
  useEffect(() => {
    function handleKeyDown({key}) {
      keyPressed(key);
    };

    if(!win) {
      window.addEventListener('keydown', handleKeyDown, []);
    }
    // Cleanup function removes listener
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guess, win]);
  
  return (
    <div className={styles.golfle}>
    <h3>Holes: {SOLUTION_COURSE.length}</h3>
    <h3>Par: {coursePar}</h3>
    <h3>Total: {score}</h3>
    <Course/>
    {Array.from({length: GUESS_COUNT}).map((_, index) => {
      if(submittedGuesses.length > index) {
        return <PreviousGuess key={index} guess={submittedGuesses[index]}/>;
      } else if(submittedGuesses.length === index) {
        return <CurrentGuess key={index} guess={guess}/>;
      } else {
        return <FutureGuess key={index}/>;
      }
    })}
    <KeyBoard keyPressed={keyPressed}/>
    {<RenderWin win={win} submittedGuesses={submittedGuesses}/>}
  </div>
  )
};

function RenderWin({win, submittedGuesses}) {
  let winBox = useRef();

  function closeWinDialog() {
    winBox.current.style.display = 'none';
  }

  function copyResult() {
    let cpy = '';

    for(let index = 0; index < submittedGuesses.length; index++) {
        // Get last guess
        let guess = submittedGuesses[index];
        const fullSolution = [...SOLUTION_COURSE.map((par, index) => {return [par, SOLUTION[index], false]})];
        const displaySolution = [...guess.map(g => [g, 0])];
    
        // Find correct solutions
        displaySolution.forEach((g, i) => {
          if(g[0] === SOLUTION[i]) {
            g[1] = 1;
            fullSolution[i][2] = true;
          }
        })
      
        // Find almost correct solutions
        displaySolution.forEach((g, i) => {
          if(g[1] !== 0) {
            // Solution already correct
            return;
          }
      
          fullSolution.forEach((fs, fsi) => {
            if(fs[2] === false && g[0] === fs[1] && SOLUTION_COURSE[fsi] === SOLUTION_COURSE[i]) {
              fs[2] = true;
              g[1] = 2;
            }
          });
        });

        const gray = String.fromCodePoint('0x2B1B');
        const green = String.fromCodePoint('0x1F7E9');
        const yellow = String.fromCodePoint('0x1F7E8');
        
        cpy += displaySolution.map(g => g[1] === 0 ?  gray : (g[1] === 1 ? green : yellow)).join('') + '\n';
    }

    navigator.clipboard.writeText(cpy);
  }
  

  if(win !== PLAYING) {
    // Won or lost...
    let txt = win === WON ? 'You win!!' : 'You lose :/';
    return (
      <div ref={winBox} className={styles.winBox}>
        <div>{txt}</div>
        <button onClick={copyResult}>Copy Result</button>
        <button onClick={closeWinDialog}>Close</button>
      </div>
    );
  } else {
    return null;
  }
}

export default Golfle;

function Course() {
  return (
    <div className={styles.guess}>
      {SOLUTION_COURSE.map((v, index) =>{
        return <span key={index} className={styles.par}>{v}</span>
      })}
    </div>

  )
}

function CurrentGuess({guess}) {
  return (
    <div className={styles.guess}>
      {Array.from({length: SCORE_COUNT}).map((_, index) => {
        return <span className={styles.num} key={index}>{guess[index] || ''}</span>
      })}
    </div>
  );
}

function PreviousGuess({guess}) {
  const fullSolution = [...SOLUTION_COURSE.map((par, index) => {return [par, SOLUTION[index], false]})];
  const displaySolution = [...guess.map(g => [g, 0])];

  // Find correct solutions
  displaySolution.forEach((g, i) => {
    if(g[0] === SOLUTION[i]) {
      g[1] = 1;
      fullSolution[i][2] = true;
    }
  })

  // Find almost correct solutions
  displaySolution.forEach((g, i) => {
    if(g[1] !== 0) {
      // Solution already correct
      return;
    }

    fullSolution.forEach((fs, fsi) => {
      if(fs[2] === false && g[0] === fs[1] && SOLUTION_COURSE[fsi] === SOLUTION_COURSE[i]) {
        fs[2] = true;
        g[1] = 2;
      }
    });
  });

  return (
    <div className={styles.guess}>
      {Array.from({length: SCORE_COUNT}).map((_, index) => {
        let className = styles.numWrong;
        if(displaySolution[index][1] === 1) {
          className = styles.numCorrect;
        } else if (displaySolution[index][1] === 2) {
          className = styles.numAlmostCorrect;
        }
        return <span className={className} key={index}>{guess[index]}</span>
      })}
    </div>
  )
}

function FutureGuess() {
  return (
    <div className={styles.guess}>
      {Array.from({length: SCORE_COUNT}).map((_, index) => {
                return <span className={styles.num} key={index}></span>
              })}
    </div>
  );
}