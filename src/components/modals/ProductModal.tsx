import Modal from '@mui/material/Modal';
import RedButton from '../buttons/button-excluir/RedButton';
import { IoMdClose } from "react-icons/io";
import Input from '../inputs/Input';
import { useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import Button from '../buttons/Button';
import axios, { AxiosError } from 'axios';
import { z } from 'zod'
import Swal from 'sweetalert2';

const productSchema = z.object({
  quantity: z.number().min(1, "Quantity is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().regex(/^-?\d+(\.\d+)?$/, "Price must be a valid number"),
});

export interface CreateProductModalProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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

export default function CreateProductModal({ open, setIsOpen }: CreateProductModalProps) {
  const [quantity, setQuantity] = useState(0)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const handleCreateProduct = async () => {
    const result = productSchema.safeParse({ quantity, name, price, description });
      if (!result.success) {
        console.log(result)
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      
        Toast.fire({
          icon: "warning",
          title: errorMessages, 
        });
      
        console.log(errorMessages);
      } else {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}products`, {
            name,
            price: Number(price),
            description,
            quantity
          }, {
            withCredentials: true
          }).then(() => {
            Toast.fire({
              icon: "success",
              title: 'Product Successfully Created', 
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
  }}

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-[512px] h-[402px] bg-neutral-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-gray-500 pl-10 pr-10 pb-8 pt-8 flex flex-col justify-between">
        <div className='border-b border-gray-400 flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Cadastrar novo produto</h2>
          <IoMdClose size={25} className='text-gray-400 cursor-pointer' onClick={() => setIsOpen(false)}/>
        </div>
        <div className='flex justify-between items-center'>
          <Input onChange={(e) => {
            setName(e.target.value)
          }} id='name' label='Nome do produto' type='text' placeholder='Nome do produto'/>
          <div className='h-full flex flex-col justify-around'>
            <p>Quantidade</p>
            <div className='flex w-20 h-8 border-2 rounded-sm border-teal-600 justify-around items-center'>
              <FiMinus 
              className="text-teal-600 cursor-pointer"
              size={20}
              onClick={() => setQuantity((prev) => {
                if(prev == 0) {
                  return 0
                } else return prev - 1
              })}/>
              <p>{quantity}</p>
              <FiPlus 
              className="text-teal-600 cursor-pointer"
              size={20}
              onClick={() => setQuantity((prev) => prev + 1)}/>
            </div>
          </div>
        </div>
        <Input 
        onChange={(e) => {
          setDescription(e.target.value)
        }}
        id='description' placeholder='Descrição do produto' label='Descrição' type='text'/>
        <Input 
        onChange={(e) => {
          setPrice(e.target.value)
        }}
        id='value' placeholder='Valor do produto' label='Valor' type='text'/>
        <div className='flex justify-end gap-4'>
          <RedButton content='Cancelar' onClick={() => setIsOpen(false)}/> 
          <Button
          onClick={async () => await handleCreateProduct()}
          content="Cadastrar"/>
        </div>
      </div>
    </Modal>
  );
}
