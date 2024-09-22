export interface ButtonProps {
  content: string
}

const Button = ({ content }: ButtonProps) => {
  return (  
    <button
    className="h-10 w-auto pl-4 pr-4 bg-emerald-700 font-normal text-white rounded-sm shadow-sm shadow-gray-600"
    >{content}</button>
  );
}
 
export default Button;