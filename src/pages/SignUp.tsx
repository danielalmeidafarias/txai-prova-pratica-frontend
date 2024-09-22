import Button from "../components/buttons/Button";
import ProfilePicButton from "../components/buttons/button-profile/ProfilePicButton";
import Input from "../components/inputs/Input";
import { RiArrowGoBackFill } from "react-icons/ri";
import logo from '../assets/images/logo-2.svg'


const SignUp = () => {
  return (
  <div className="w-screen h-screen overflow-hidden flex items-center justify-center pb-52">
    <div className="flex flex-col items-start gap-16">
      <div className="flex flex-col items-start gap-5">
        <img className="h-12" src={logo} alt="" />
        <div>
          <h2 className="font-bold text-3xl text-zinc-800">Faça seu Cadastro</h2>
          <p className="text-sm text-gray-500" >*Campos obrigatórios</p>
        </div>
        <ProfilePicButton />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input id="nome" label="*Nome Completo" type="text" placeholder="Insira seu nome completo"/>
        <Input id="cpf" label="*CPF" type="text" placeholder="Insira seu CPF, somente os números"/>
        <Input id="email" label="E-mail" type="email" placeholder="Insira seu melhor e-mail"/>
        <Input id="nickname" label="*Nome de usuário" type="" placeholder="Insira seu nome de usuário"/>
        <Input id="password" label="*Senha" type="" placeholder="Insira uma senha forte"/>
        <Input id="" label="*Confirmar Senha" type="" placeholder="Confirmar senha"/>
      </div>
      <div className="flex justify-end h-full w-full gap-6">
        <div className="h-10 flex grid-2 items-center">
          <RiArrowGoBackFill className="text-gray-500"/>
          <p className="text-gray-500 hover:text-gray-700 duration-100 cursor-pointer">Voltar ao login</p>
        </div>
        <Button content="Concluir Cadastro"/>
      </div>
    </div>
  </div>
  );
}
export default SignUp;