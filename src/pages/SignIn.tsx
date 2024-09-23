import axios, { AxiosError } from 'axios';
import logo from '../assets/images/logo-3.svg';
import Button from '../components/buttons/Button';
import Input from '../components/inputs/Input';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUserStore from '../state/userStore';

const loginSchema = z.object({
  nickname: z.string().min(1, "Nickname is required"), // Must be a non-empty string
  password: z.string().min(6, "Password must be at least 6 characters long"), // Must be at least 6 characters
});

interface LoginInterface {
  nickname: string;
  password: string;
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

const SignIn = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const { userInfo, setUserInfo } = useUserStore();
  
  useEffect(() => {
    const signup = searchParams.get('signup');
    const unauthorized = searchParams.get('unauthorized');
    const logout = searchParams.get('logout');
    if(signup == 'true') {
      Toast.fire({
        icon: "success",
        title: "Successful signup", 
      }).then(() => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('signup');
        setSearchParams(updatedParams);
      });
    } else if(unauthorized == 'true') {
      Toast.fire({
        icon: "error",
        title: "Unauthorized", 
      }).then(() => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('unauthorized');
        setSearchParams(updatedParams);
      });
    } else if(logout == 'true') {
      Toast.fire({
        icon: "success",
        title: "Successfully logout", 
      }).then(() => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('logout');
        setSearchParams(updatedParams);
      });
    }
  }, [])

  useEffect(() => {
    if(userInfo) {
      navigate('/products')
    }
  }, [userInfo])

  const navigate = useNavigate()

  const handleLogin = async ({ nickname, password }: LoginInterface) => {
    try {
      const result = loginSchema.safeParse({ nickname, password });
  
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      
        Toast.fire({
          icon: "warning",
          title: errorMessages, 
        });
      
        console.log(errorMessages);
      } else {
        await axios.post('http://localhost:3000/auth/login', {
          nickname,
          password
        }, {withCredentials: true}).then((response) => {
          setUserInfo(response.data.user)
        });

        navigate('/products?login=true')
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
    <div className="w-screen h-screen overflow-hidden flex relative">
      <div className="w-1/2 h-screen z-10 relative">
        <div className="bg-teal-800 w-full h-full z-10"></div>
        <div className="bg-teal-700 w-[40vw] h-[40vw] z-10 absolute left-0 bottom-0 rotate-45 translate-x-3/4 translate-y-1/2"></div>
        <div className="bg-teal-800/70 w-[40vw] h-[40vw] z-10 absolute left-0 bottom-0 -rotate-45 translate-x-2/4 translate-y-3/4"></div>
        <div className="absolute w-full h-screen z-30 left-0 bottom-0 flex items-center pb-44">
          <div className='pl-32 w-full flex flex-col items-center'>
            <h1 className="text-white text-5xl font-bold drop-shadow-[1px_1.5px_rgba(0,0,0,1)]">Bem-vindo!</h1>
            <img className='w-96' src={logo} alt="" />
          </div>
        </div>
      </div>

      <div className="absolute z-30 w-1/2 h-screen right-0 bg-neutral-100 flex items-center justify-center pb-32 pr-20">
        <div className='w-80 flex flex-col gap-5'>
          <h2 className='font-bold text-3xl'>Login</h2>
          <Input 
            id='nickname' 
            label='Nome de usuário' 
            placeholder='Insira seu nome de usuáro' 
            value={nickname}
            type='text' 
            onChange={(e) => setNickname(e.target.value)} // Update CPF state on input change
          />
          <Input 
            id='password' 
            label='Senha' 
            placeholder='Insira sua senha' 
            value={password}
            type='password' 
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />
          <div className='flex justify-between'>
            <p className='text-sm'>Lembrar minha senha</p>
            <p className='text-sm text-teal-700 cursor-pointer'>Esqueci minha senha</p>
          </div>
          <Button 
          onClick={async () => {
            await handleLogin({nickname, password})
          }}  
          content='Entrar'/>
          <p className='text-sm w-full flex justify-center gap-1'>Não tem conta?<span 
          onClick={() => navigate('/signup')}
          className='text-sm text-teal-700 cursor-pointer'>Cadastre-se agora</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
