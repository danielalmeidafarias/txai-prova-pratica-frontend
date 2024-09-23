import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdOutlineArrowDropDown } from "react-icons/md";
import RedButton from '../buttons/button-excluir/RedButton';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../state/userStore';
import { useState } from 'react';
import UserModal from '../modals/UserModal';

const options = [
  'Profile',
];

const ITEM_HEIGHT = 48;

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

export default function UserMenu() {
  const navigate = useNavigate()
  const { userInfo,clearUserInfo } = useUserStore();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); 
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}auth/logout`, null, {
      withCredentials: true
    }).then(() => {
      Toast.fire({
        icon: "success",
        title: "Successful signup", 
      }).then(() => {
        clearUserInfo()
        navigate('/login?logout=true')
      });
    })
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MdOutlineArrowDropDown size={18} className='text-zinc-800'/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '12ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            <div onClick={() => setModalIsOpen(true)}>
              {option}
            </div>
          </MenuItem>
        ))}
          <MenuItem onClick={handleClose}>
            <RedButton 
            onClick={() => handleLogout()}
            content='Logout'/>
          </MenuItem>
      </Menu>
      {userInfo !== null && (
        <UserModal open={modalIsOpen} setIsOpen={setModalIsOpen} id={userInfo.id}/>
      )}
    </div>
  );
}