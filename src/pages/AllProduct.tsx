import DataGrid from '../components/datagrid/DataGrid';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateProductModal from "../components/modals/ProductModal";

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

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const signup = searchParams.get('login');
    if(signup === 'true') {
      Toast.fire({
        icon: "success",
        title: "Successful login", 
      }).then(() => {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete('login');
        setSearchParams(updatedParams);
      });
    }
  }, [searchParams, setSearchParams]);

  return ( 
    <div className="w-screen h-screen flex flex-col gap-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold w-full text-center">Home</h1>
        <div className="w-64 h-1 bg-teal-700"></div>
      </div>
      <DataGrid />
      <CreateProductModal open={modalIsOpen} setIsOpen={setModalIsOpen}/>
    </div>
  );
};

export default AllProducts;
