import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteUserModal from "../modals/DeleteUserModal copy";

interface Props {
  id: string
}

const DeleteUserComponent = ({ id }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (  
    <>
      <FaRegTrashAlt 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          setModalIsOpen(true)
        }} 
      />
      <DeleteUserModal open={modalIsOpen} setIsOpen={setModalIsOpen} 
      id={id}
      />
    </>
  );
}
 
export default DeleteUserComponent;