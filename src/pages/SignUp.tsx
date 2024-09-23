import Button from "../components/buttons/Button";
import ProfilePicButton from "../components/buttons/button-profile/ProfilePicButton";
import Input from "../components/inputs/Input";
import { RiArrowGoBackFill } from "react-icons/ri";
import logo from '../assets/images/logo-2.svg';
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useUserStore from "../state/userStore";

const userSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"),
  fullname: z.string().min(1, "Full name is required"),
  cpf: z.string().length(11, "CPF must be 11 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

interface SignUpInterface {
  nickname: string;
  fullname: string;
  cpf: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const { userInfo } = useUserStore();

  const navigate = useNavigate()

  useEffect(() => {
    if(userInfo) {
      navigate('/products')
    }
  }, [userInfo])

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


  const handleSignUp = async ({ cpf, email, fullname, nickname, password }: SignUpInterface) => {
    try {
      const result = userSchema.safeParse({ cpf, email, fullname, nickname, password });
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      
        Toast.fire({
          icon: "warning",
          title: errorMessages, 
        });
      
        console.log(errorMessages);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          email,
          cpf,
          fullname,
          nickname,
          password,
        })

        navigate('/login?signup=true')
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Toast.fire({
          icon: "warning",
          title: err.response?.data.message
        });
      }
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center pb-52">
      <div className="flex flex-col items-start gap-16">
        <div className="flex flex-col items-start gap-5">
          <img className="h-12" src={logo} alt="" />
          <div>
            <h2 className="font-bold text-3xl text-zinc-800">Faça seu Cadastro</h2>
            <p className="text-sm text-gray-500">*Campos obrigatórios</p>
          </div>
          <ProfilePicButton />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input 
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            id="fullname" 
            label="*Nome Completo" 
            type="text" 
            placeholder="Insira seu nome completo"
          />
          <Input 
            onChange={(e) => setCpf(e.target.value)}
            value={cpf}
            id="cpf" 
            label="*CPF" 
            type="text" 
            placeholder="Insira seu CPF, somente os números"
          />
          <Input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email" 
            label="E-mail" 
            type="email" 
            placeholder="Insira seu melhor e-mail"
          />
          <Input 
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            id="nickname" 
            label="*Nome de usuário" 
            type="text" 
            placeholder="Insira seu nome de usuário"
          />
          <Input 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password" 
            label="*Senha" 
            type="password" 
            placeholder="Insira uma senha forte"
          />
          <Input 
            onChange={(e) => setConfirmedPassword(e.target.value)}
            value={confirmedPassword}
            id="confirm-password" 
            label="*Confirmar Senha" 
            type="password" 
            placeholder="Confirmar senha"
          />
        </div>

        <div className="flex justify-end h-full w-full gap-6">
          <div className="h-10 flex grid-2 items-center">
            <RiArrowGoBackFill className="text-gray-500" />
            <p 
            onClick={() => navigate('/signin')}
            className="text-gray-500 hover:text-gray-700 duration-100 cursor-pointer">Voltar ao login</p>
          </div>
          <Button 
            content="Concluir Cadastro" 
            onClick={() => handleSignUp({ cpf, email, fullname, nickname, password })}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
