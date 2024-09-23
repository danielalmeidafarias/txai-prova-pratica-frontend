import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import logo from '../../assets/images/logo-1.svg'
import LongMenu from "./HamburgerMenu";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";
import UserMenu from "./UserMenu";
import { FaRegUserCircle } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import useUserStore from "../../state/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { userInfo } = useUserStore();

  const navigate = useNavigate()

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    
    setActiveTab(currentPath || "home"); // Default to 'home' if the path is empty
  }, [location]);

  return (  
    <AppBar position="static" sx={{
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }}>
  <Toolbar variant="regular" sx={{ borderBottom: '1px solid #d1d5db', height: '80px'}}>
    <Typography variant="h6" className="bg-transparent" component="div">
      <LongMenu />
    </Typography >
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, paddingLeft: '30px' }}>
      <img src={logo} alt="" />
    </IconButton>
    <Box sx={{ flexGrow: 1 }} />
    <Typography variant="h6" className="cursor-pointer bg-transparent text-zinc-800 hover:text-zinc-900 duration-100 flex gap-1 items-center p-2 " component="div">
      <FaRegQuestionCircle className='text-zinc-800' size={18}/>
      <p className="text-sm">Suporte</p>
    </Typography >
    <Typography variant="h6" className="cursor-pointer bg-transparent text-zinc-800 hover:text-zinc-900 duration-100 flex gap-1 items-center p-2" component="div">
    <IoCalendarOutline size={18} className='text-zinc-800'/>
      <p className="text-sm">Acessar Calendário</p>
    </Typography >
    <Typography variant="h6" className="cursor-pointer bg-transparent text-zinc-800 hover:text-zinc-900 duration-100 flex gap-1 items-center p-2" component="div">
      <HiOutlineBell className='text-teal-700'size={18}/>
    </Typography >
    <Typography variant="h6" className="bg-transparent text-zinc-800 hover:text-zinc-900 duration-100 flex gap-1 items-center p-2" component="div">
      <FaRegUserCircle />
      <p className="text-sm">{userInfo?.nickname}</p>
      <UserMenu />
    </Typography >
  </Toolbar>
  <Toolbar className="flex gap-5 ">
    <Typography variant="h6" className="bg-transparent flex gap-1 items-center pl-10 cursor-pointer" onClick={() => navigate('/home')} component="div">
      <HiHome className={activeTab === "home" ? "text-teal-700" : "text-zinc-400"}/>
      <p className={`${activeTab === "home" ? "text-teal-700" : "text-zinc-400"} text-sm`} >Home</p>
    </Typography >
    <Typography variant="h6" className="bg-transparent" component="div">
      <p className="text-zinc-400 text-sm" >/</p>
    </Typography>
    <Typography onClick={() => navigate('/users')} variant="h6" className="bg-transparent  cursor-pointer" component="div">
      <p className={`${activeTab === "users" ? "text-teal-700" : "text-zinc-400"} text-sm`} >Gestão</p>
    </Typography >
    <Typography variant="h6" className="bg-transparent" component="div">
      <p className="text-zinc-400 text-sm" >/</p>
    </Typography >
    <Typography onClick={() => navigate('/products')} variant="h6" className="bg-transparent cursor-pointer" component="div">
      <p className={`${activeTab === "products" ? "text-teal-700" : "text-zinc-400"} text-sm`} >Controle de estoque</p>
    </Typography >
  </Toolbar>
</AppBar>
  );
}
 
export default NavBar;
