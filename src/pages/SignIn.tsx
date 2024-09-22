import logo from '../assets/images/logo-3.svg'
import Button from '../components/buttons/Button';
import Input from '../components/inputs/Input';

const SignIn = () => {
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
          <Input id='cpf' label='CPF' placeholder='Insira seu CPF, somente os números' type='text'/>
          <Input id='password' label='Senha' placeholder='Insira sua senha' type='password'/>
          <div className='flex justify-between'>
            <p className='text-sm'>Lembrar minha senha</p>
            <p className='text-sm text-teal-700 cursor-pointer'>Esqueci minha senha</p>
          </div>
          <Button content='Entrar'/>
          <p className='text-sm w-full flex justify-center gap-1'>Não tem conta?<span className='text-sm text-teal-700 cursor-pointer'>Cadastre-se agora</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
