const DigitButton = ({ digit, handleClick }) => {
  return (  
    <button tabIndex="-1" className='small-button white' onClick={() => handleClick(digit)}>{digit}</button>
  );
}
 
export default DigitButton;