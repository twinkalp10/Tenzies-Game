import "./style.css";
import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, SetDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function allNewDice() {
    const DieNum = [];
    for (let i = 1; i <= 10; i++) {
      DieNum.push(generateNewDie());
    }
    return DieNum;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (!tenzies) {
      SetDice((oldDice) =>
        oldDice.map((num) => {
          return num.isHeld ? num : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      SetDice(allNewDice());
    }
  }

  function holdDice(id) {
    SetDice((oldDice) =>
      oldDice.map((num) => {
        return num.id === id ? { ...num, isHeld: !num.isHeld } : num;
      })
    );
  }

  const diceElements = dice.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      holdDice={() => {
        holdDice(num.id);
      }}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die--grid">{diceElements}</div>
      <button type="button" className="rollBtn" onClick={rollDice}>
        {tenzies === true ? "Reset" : "Roll"}
      </button>
    </main>
  );
}

export default App;
