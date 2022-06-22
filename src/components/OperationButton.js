const OperationButton = ({ operation, handleClick }) => {
  return (  
    <button tabIndex="-1" className='small-button orange' onClick={() => handleClick(operation)}>{operation}</button>
  );
}
 
export default OperationButton;