import Modal from '@mui/material/Modal';
import RedButton from '../buttons/button-excluir/RedButton';
import { IoMdClose } from "react-icons/io";
import Input from '../inputs/Input';
import { useState } from 'react';
import Button from '../buttons/Button';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import Swal from 'sweetalert2';

const userSchema = z.object({ 
  nickname: z.optional(z.string()),
  fullname: z.optional(z.string()),
  cpf: z.optional(z.string()),
  email: z.optional(z.string()),
  role: z.optional(z.string()),
});

export interface UserModalProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string
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

export default function UserModal({ open, setIsOpen, id }: UserModalProps) {
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleUpdateUser = async () => {
    const result = userSchema.safeParse({ nickname, fullname, cpf, email, role });
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      console.log(result)
      
      Toast.fire({
        icon: "warning",
        title: errorMessages, 
      });
    } else {
      try {
        await axios.patch(`http://localhost:3000/users/${id}`, {
          nickname: nickname == '' ? undefined : nickname,
          fullname: nickname == '' ? undefined : fullname,
          cpf: cpf == '' ? undefined : cpf,
          email: email == '' ? undefined : email,
          role: role == '' ? undefined : role,
        }, {
          withCredentials: true
        });
        
        Toast.fire({
          icon: "success",
          title: 'User Successfully Updated', 
        });
        setIsOpen(false);
        setNickname('');
        setFullname('');
        setCpf('');
        setEmail('');
        setRole('');
      } catch (err) {
        if (err instanceof AxiosError) {
          Toast.fire({
            icon: "warning",
            title: err.response?.data.message,
          });
        }
      }
    }
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-[512px] h-[600px] bg-neutral-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-gray-500 pl-10 pr-10 pb-8 pt-8 flex flex-col justify-between">
        <div className='border-b border-gray-400 flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Editar dados do usuário</h2>
          <IoMdClose size={25} className='text-gray-400 cursor-pointer' onClick={() => setIsOpen(false)} />
        </div>
        <Input 
          onChange={(e) => setNickname(e.target.value)} 
          id='nickname' 
          label='Nickname' 
          type='text' 
          placeholder='Nickname' 
        />
        <Input 
          onChange={(e) => setFullname(e.target.value)} 
          id='fullname' 
          label='Nome Completo' 
          type='text' 
          placeholder='Nome Completo' 
        />
        <Input 
          onChange={(e) => setCpf(e.target.value)} 
          id='cpf' 
          label='CPF' 
          type='text' 
          placeholder='CPF' 
        />
        <Input 
          onChange={(e) => setEmail(e.target.value)} 
          id='email' 
          label='Email' 
          type='email' 
          placeholder='Email' 
        />
        <Input 
          onChange={(e) => setRole(e.target.value)} 
          id='role' 
          label='Role' 
          type='text' 
          placeholder='Role' 
        />
        <div className='flex justify-end gap-4'>
          <RedButton content='Cancelar' onClick={() => setIsOpen(false)} /> 
          <Button
            onClick={handleUpdateUser}
            content="Atualizar" 
          />
        </div>
      </div>
    </Modal>
  );
}
