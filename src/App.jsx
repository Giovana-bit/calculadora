import './App.css'
import Display from './assets/components/display/index';
import Buttons from './assets/components/buttons/index';
import { useState } from 'react';

function App() {

  const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
  }

  const [states, setStates] = useState(initialState);

  function addNumber(number) {
    // Não permite mais de um ponto
    if (number === '.' && states.displayValue.includes('.')) {
      return;
    }

    setStates(prev => {
      const clearDisplay = prev.displayValue === '0' || prev.clearDisplay;
      const currentValue = clearDisplay ? '' : prev.displayValue;
      const displayValue = currentValue + number;

      const values = [...prev.values];
      values[prev.current] = parseFloat(displayValue);

      return {
        ...prev,
        displayValue,
        clearDisplay: false,
        values
      };
    });
  }

  function clearMemory() {
    setStates(initialState);
  }

  function setOperation(operation) {
    if (states.current === 0) {
      setStates(prev => ({
        ...prev,
        operation,
        current: 1,
        clearDisplay: true
      }));
    } else {
      const equals = operation === '=';
      const values = [...states.values];

      try {
        values[0] = eval(`${values[0]} ${states.operation} ${values[1]}`);
      } catch (error) {
        values[0] = states.values[0];
      }

      values[1] = 0;

      setStates(prev => ({
        ...prev,
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values
      }));
    }
  }

  return (
    <div className="container">
      <h1 className='tittle'> Calculadora em React</h1>
      <Display value={states.displayValue} />
      <div className="buttonsContainer">
        <Buttons value="AC" type={"triple"} action={clearMemory} />
        <Buttons value="/" type={"operation"} action={() => setOperation('/')} />
        <Buttons value="7" action={() => addNumber('7')} />
        <Buttons value="8" action={() => addNumber('8')} />
        <Buttons value="9" action={() => addNumber('9')} />
        <Buttons value="*" type={"operation"} action={() => setOperation('*')} />
        <Buttons value="4" action={() => addNumber('4')} />
        <Buttons value="5" action={() => addNumber('5')} />
        <Buttons value="6" action={() => addNumber('6')} />
        <Buttons value="-" type={"operation"} action={() => setOperation('-')} />
        <Buttons value="1" action={() => addNumber('1')} />
        <Buttons value="2" action={() => addNumber('2')} />
        <Buttons value="3" action={() => addNumber('3')} />
        <Buttons value="+" type={"operation"} action={() => setOperation('+')} />
        <Buttons value="0" type={"duple"} action={() => addNumber('0')} />
        <Buttons value="." action={() => addNumber('.')} />
        <Buttons value="=" type={"operation"} action={() => setOperation('=')} />
      </div>
    </div>
  )
}

export default App;
