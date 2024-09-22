import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import { RiPencilFill } from "react-icons/ri";

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DataGrid = () => {
  const handleEdit = (id) => {
    console.log("Edit row with ID:", id);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.1, filterable: true },
    {
      field: 'created_at',
      headerName: 'Data de cadastro',
      editable: false,
      flex: 0.15,
      filterable: true,
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
      field: 'unit_price',
      headerName: 'Valor unitário',
      editable: true,
      flex: 0.1,
      filterable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      sortable: false,
      flex: 0.1,
      filterable: true,
    },
    {
      field: 'total_price',
      headerName: 'Valor total',
      editable: true,
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
          <RiPencilFill 
            style={{ cursor: 'pointer' }} 
            onClick={() => handleEdit(params.row.id)} 
          />
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 'auto', width: '100%', display: 'flex', paddingLeft: '80px', paddingRight: '80px' }}>
      <MuiDataGrid
        sx={{ height: '100%', width: '100%' }}
        rows={rows}
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
