import { RiPencilFill } from "react-icons/ri";
import UpdateProductModal from "../modals/UpdateProductModal";
import { useState } from "react";

interface Props {
  name: string;
  description: string;
  quantity: number;
  price: string;
  id: string
}

const EditComponent = ({ id, description, name, price, quantity }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (  
    <>
      <RiPencilFill 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          setModalIsOpen(true)
        }} 
      />
      <UpdateProductModal open={modalIsOpen} setIsOpen={setModalIsOpen} 
      id={id} description={description} name={name} price={price} quantity={quantity}
      />
    </>
  );
}
 
export default EditComponent;