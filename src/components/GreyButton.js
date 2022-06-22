const GreyButton = ({ symbol, handleClick }) => {
  return (  
    <button tabIndex="-1" className='small-button grey' onClick={handleClick}>{symbol}</button>
  );
}
 
export default GreyButton;