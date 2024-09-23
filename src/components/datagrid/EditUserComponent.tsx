import { RiPencilFill } from "react-icons/ri";
import { useState } from "react";
import UserModal from "../modals/UserModal";

interface Props {
  id: string
}

const EditUserComponent = ({ id }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (  
    <>
      <RiPencilFill 
        style={{ cursor: 'pointer' }} 
        onClick={() => {
          setModalIsOpen(true)
        }} 
      />
      <UserModal open={modalIsOpen} setIsOpen={setModalIsOpen} id={id}/>
    </>
  );
}
 
export default EditUserComponent;