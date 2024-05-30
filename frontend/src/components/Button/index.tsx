interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
}

export default function Button( {text, type='button', handleClick}: ButtonProps ) {
  return (
    <button className="button-class" type={type} onClick={handleClick}>{text}</button>
  )
}