export interface ButtonProps {
  content: string
}

const RedButton = ({ content }: ButtonProps) => {
  return (  
    <button
    className="h-10 w-auto pl-4 pr-4 bg-red-700 hover:bg-red-800 ease-in-out duration-200 font-normal text-white rounded-sm shadow-sm shadow-gray-600"
    >{content}</button>
  );
}
 
export default RedButton;