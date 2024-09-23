import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import RedButton from '../buttons/button-excluir/RedButton';
import Button from '../buttons/Button';
import { FaRegTrashAlt } from "react-icons/fa";

export interface DeleteProductModalProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export default function DeleteProductModal({ open, setIsOpen, id }: DeleteProductModalProps) {
  const handleDeleteProduct = async () => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        withCredentials: true
      }).then(() => {
        Toast.fire({
          icon: "success",
          title: 'Product Successfully Deleted', 
        });
        setIsOpen(false)
      })
    } 
    catch (err) {
      if (err instanceof AxiosError) {
        Toast.fire({
          icon: "warning",
          title: err.response?.data.message
        });
      }
      console.log(err);
    }
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-[512px] h-[232px] bg-neutral-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-gray-500 pl-10 pr-10 pb-8 pt-8 flex flex-col items-center justify-between">
        <div className='flex justify-center items-center w-full'>
          <div className='w-14 h-14 text-xl font-semibold rounded-full bg-red-600 flex items-center justify-center'>
            <FaRegTrashAlt size={25} className='text-white'/>
          </div>
          <IoMdClose size={25} className='text-gray-400 cursor-pointer absolute top-3 right-3' onClick={() => setIsOpen(false)}/>
        </div>
        <p className='text-lg font-semibold'>Você tem certeza que deseja excluir esse item?</p>
        <div className='pl-14 pr-14 gap-2 flex justify-between'>
          <RedButton 
          onClick={() => setIsOpen(false)}
          content='Cancelar'/>
          <Button 
          onClick={() => handleDeleteProduct()}
          content='Confirmar'/>
        </div>
      </div>
    </Modal>
  );
}
