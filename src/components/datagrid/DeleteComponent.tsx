import DeleteProductModal from "../modals/DeleteProductModal";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  id: string
}

const DeleteComponent = ({ id }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (  
    <>
      <FaRegTrashAlt 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          setModalIsOpen(true)
        }} 
      />
      <DeleteProductModal open={modalIsOpen} setIsOpen={setModalIsOpen} 
      id={id}
      />
    </>
  );
}
 
export default DeleteComponent;