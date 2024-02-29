import './App.css';
import React, { useState } from 'react';

function App() {
  const [calculator, setCalculator] = useState({
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
  });

  const inputDigit = digit => {
    const { displayValue, waitingForSecondOperand } = calculator;
    let newDisplayValue;

    if (waitingForSecondOperand) {
      newDisplayValue = String(digit);
    } else {
      newDisplayValue = displayValue === '0' ? String(digit) : displayValue + digit;
    }

    setCalculator(prevState => ({ ...prevState, displayValue: newDisplayValue, waitingForSecondOperand: false }));
  }

  const inputDecimal = dot => {
    if (calculator.waitingForSecondOperand) {
      setCalculator(prevState => ({ ...prevState, displayValue: '0.', waitingForSecondOperand: false }));
      return;
    }

    if (!calculator.displayValue.includes(dot)) {
      setCalculator(prevState => ({ ...prevState, displayValue: prevState.displayValue + dot }));
    }
  }

  const handleOperator = nextOperator => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      setCalculator(prevState => ({ ...prevState, operator: nextOperator }));
      return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
      setCalculator(prevState => ({ ...prevState, firstOperand: inputValue }));
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = calculate(currentValue, inputValue, operator);

      setCalculator(prevState => ({ ...prevState, displayValue: String(result), firstOperand: result }));
    }
    setCalculator(prevState => ({ ...prevState, waitingForSecondOperand: true, operator: nextOperator }));
  }

  const handleEqual = () => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && !calculator.waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setCalculator(prevState => ({
        ...prevState,
        displayValue: String(result),
        firstOperand: result,
        waitingForSecondOperand: true,
        operator: null
      }));
    }
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const resetCalculator = () => {
    setCalculator({
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null
    });
  };

  const handleClick = event => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }

    if (target.classList.contains('operator')) {
      if (target.value === '=') {
        handleEqual();
      } else {
        handleOperator(target.value);
      }
      return;
    }

    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      return;
    }

    if (target.classList.contains('all-clear')) {
      resetCalculator();
      return;
    }

    inputDigit(target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Rosie Calculator</p>
        <div className="calculator">
          <input type="text" id="display" className="calculator-screen" value={calculator.displayValue} disabled />

          <div className="calculator-keys" onClick={handleClick}>
            <button type="button" className="all-clear" id="clear" value="all-clear">AC</button>
            <button type="button" id="divide" className="operator" value="/">&divide;</button>
            <button type="button" id="multiply" className="operator" value="*">&times;</button>
            <button type="button" id="add" className="operator" value="+">+</button>
            <button type="button" id="subtract" className="operator" value="-">-</button>

            <button type="button" id="seven" value="7">7</button>
            <button type="button" id="eight" value="8">8</button>
            <button type="button" id="nine" value="9">9</button>
            <button type="button" id="four" value="4">4</button>
            <button type="button" id="five" value="5">5</button>
            <button type="button" id="six" value="6">6</button>
            <button type="button" id="one" value="1">1</button>
            <button type="button" id="two" value="2">2</button>
            <button type="button" id="three" value="3">3</button>
            <button type="button" id="zero" value="0">0</button>

            <button type="button" id="decimal" className="decimal" value=".">.</button>
            <button type="button" id="equal-sign" className="equal-sign operator" value="=">=</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;