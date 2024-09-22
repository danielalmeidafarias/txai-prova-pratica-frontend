export interface InputProps {
  type: string;
  placeholder?: string;
  label: string;
  id: string;
}

const Input = ({ type, placeholder, label, id }: InputProps) => {
  return (  
    <div className="flex flex-col justify-around w-80 h-16">
      <label htmlFor={id} className="font-thin text-base drop-shadow-lg">{label}</label>
      <input 
      className="outline-none border-[1px] border-gray-300 placeholder:text-base h-3/5 rounded-sm pl-2 placeholder:-translate-y-[1px]"
      id={id} type={type} placeholder={placeholder}/>
    </div>
  );
}
 
export default Input;