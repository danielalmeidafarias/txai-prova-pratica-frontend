import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditComponent from './EditComponent';
import DeleteComponent from './DeleteComponent';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  quantity: number;
  price: number;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
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

interface Props {
  user_id?: string;
}

const DataGrid = ({ user_id }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.2, sortable: false, disableColumnMenu: true, type: 'string' },
    {
      field: 'created_at',
      headerName: 'Data de cadastro',
      editable: true,
      flex: 0.15,
      filterable: true,
      type: 'date',
      valueGetter: (params) => new Date(params),
    },
    {
      field: 'name',
      headerName: 'Nome',
      editable: true,
      flex: 0.15,
      filterable: true,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      editable: true,
      flex: 0.15,
      filterable: true,
    },
    {
      field: 'price',
      headerName: 'Valor unitário',
      editable: true,
      flex: 0.1,
      filterable: true,
      type: 'number',
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      sortable: false,
      flex: 0.1,
      filterable: true,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      filterable: false,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <EditComponent 
            description={params.row.description}
            name={params.row.name}
            price={String(params.row.price)}
            quantity={params.row.quantity}
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
          <DeleteComponent id={String(params.row.id)}/>
        </div>
      ),
    },
  ];

  const getProducts = async () => {
    try {
      const response = await axios.get(user_id ? `${import.meta.env.VITE_API_URL}products?owner_id=${user_id}` : `${import.meta.env.VITE_API_URL}products`, {
        withCredentials: true,
      });
      if (response.data.message === "No product found with this filters") {
        Toast.fire({
          icon: "warning",
          title: "No product found",
        });
      } else {
        setProducts(response.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          navigate('/login?unauthorized=true');
        }
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box sx={{ height: 'auto', width: '100%', display: 'flex', paddingLeft: '80px', paddingRight: '80px' }}>
      <MuiDataGrid
        sx={{ height: '100%', width: '100%' }}
        rows={products || []}
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

export default DataGrid;
