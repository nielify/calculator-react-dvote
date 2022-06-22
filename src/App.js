import './App.css';
import { useCallback, useState } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import GreyButton from './components/GreyButton';

function App() {
  const [prevInput, setPrevInput] = useState('');
  const [input, setInput] = useState('0');
  const [operation, setOperation] = useState('');

  //calculator formatting
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })

  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

  //button click handlers
  const handleClearClick = () => {
    setInput('0');
    setPrevInput('');
    setOperation('');
  }

  const handlePlusMinus = () => {
    if (input === '0') return;
    if (input.charAt(0) === '-') setInput(input.slice(1));
    else setInput('-' + input);
  }

  const handleDigitClick = useCallback((digit) => {
    if (digit === '0' && input === '0') return;
    else setInput(input + digit);
  }, [input]);

  const handleDotClick = () => {
    if (!input.includes('.')) {
      setInput(prev => (input.toString() + '.').toString());
    }
  }

  const handleOperationClick = useCallback((operation) => {
    if (input === '0') return;
    else if (prevInput !== '' && operation !== '') {
      let result = calculate();
      setPrevInput(result.toString());
      setOperation(operation);
      setInput('0');
    } 
    else {
      setPrevInput(input);
      setOperation(operation);
      setInput('0');
    }
  }, [input, prevInput]);

  const handleEqualsClick = () => {
    if (prevInput === '') return;

    let result = calculate();

    setInput(result.toString());
    setPrevInput('');
    setOperation('');
  }

  const handlePercentClick = () => {
    if (input === '0') return;
    
    const fixedDigits = input.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(input) / 100
    const result =  String(newValue.toFixed(fixedDigits.length + 2));

    setInput(result);
    setPrevInput('');
    setOperation('');
  }

  const calculate = () => {
    let prevInput_ = parseFloat(prevInput);
    let input_ = parseFloat(input);
    let result;

    switch (operation) {
      case '+':
        result = prevInput_ + input_;
      break;
      case '-':
        result = prevInput_ - input_;
      break;
      case '×':
        result = prevInput_ * input_;
      break;
      case '÷':
        result = prevInput_ / input_;
      break;
      default:
        alert('invalid operation');
    }

    return result;
  }

  return (
    <div className="App">
      <div className='calculator'>
        <div className='screen'>
          <div className='previous-input'>{prevInput === '' ? '' : formatOperand(prevInput) + ` ${operation}`}</div>
          <div className='input'>{formatOperand(input)}</div>
        </div>
        <div>
          <button tabIndex="-1" className='small-button grey' onClick={handleClearClick}>{input === '0' ? 'AC' : 'C'}</button>
          <GreyButton symbol={'±'} handleClick={handlePlusMinus} />
          <GreyButton symbol={'%'} handleClick={handlePercentClick} />
          <OperationButton operation={'÷'} handleClick={handleOperationClick} />
        </div>
        <div>
          <DigitButton digit={7} handleClick={handleDigitClick} />
          <DigitButton digit={8} handleClick={handleDigitClick} />
          <DigitButton digit={9} handleClick={handleDigitClick} />
          <OperationButton operation={'×'} handleClick={handleOperationClick} />
        </div>
        <div>
          <DigitButton digit={4} handleClick={handleDigitClick} />
          <DigitButton digit={5} handleClick={handleDigitClick} />
          <DigitButton digit={6} handleClick={handleDigitClick} />
          <OperationButton operation={'-'} handleClick={handleOperationClick} />
        </div>
        <div>
          <DigitButton digit={1} handleClick={handleDigitClick} />
          <DigitButton digit={2} handleClick={handleDigitClick} />
          <DigitButton digit={3} handleClick={handleDigitClick} />
          <OperationButton operation={'+'} handleClick={handleOperationClick} />
        </div>
        <div>
          <button tabIndex="-1" className='big-button white' onClick={() => handleDigitClick('0')}>0</button>
          <button tabIndex="-1" className='small-button white' onClick={handleDotClick} style={{fontWeight: 'bold'}}>.</button>
          <OperationButton operation={'='} handleClick={handleEqualsClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
