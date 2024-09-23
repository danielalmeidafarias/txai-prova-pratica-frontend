import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditUserComponent from './EditUserComponent';
import DeleteUserComponent from './DeleteUserComponent';

export interface IUser {
  id: string;
  nickname: string;
  fullname: string;
  cpf: string;
  email: string;
  role: string;
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

const UserGrid = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.2, sortable: false, disableColumnMenu: true, type: 'string' },
    { field: 'nickname', headerName: 'Nickname', flex: 0.2, editable: true },
    { field: 'fullname', headerName: 'Full Name', flex: 0.2, editable: true },
    { field: 'cpf', headerName: 'CPF', flex: 0.15, editable: true, type: 'string' },
    { field: 'email', headerName: 'Email', flex: 0.25, editable: true, type: 'string' },
    { field: 'role', headerName: 'Role', flex: 0.1, editable: true, type: 'string' },
    {
      field: 'edit',
      headerName: 'Edit',
      filterable: false,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <EditUserComponent 
            id={String(params.row.id)}
          />
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <DeleteUserComponent id={String(params.row.id)}/>
        </div>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true });
      if (response.data.message === "No users found") {
        Toast.fire({
          icon: "warning",
          title: "No users found",
        });
      } else {
        setUsers(response.data);
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        navigate('/login?unauthorized=true');
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ height: 'auto', width: '100%', display: 'flex', paddingLeft: '80px', paddingRight: '80px' }}>
      <MuiDataGrid
        sx={{ height: '100%', width: '100%' }}
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UserGrid;
