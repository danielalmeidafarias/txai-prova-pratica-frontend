import Button from "../components/buttons/Button";
import { FaPlus } from "react-icons/fa";
import DataGrid from '../components/datagrid/DataGrid';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateProductModal from "../components/modals/ProductModal";
import useUserStore from "../state/userStore";

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

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { userInfo } = useUserStore();

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
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold w-full text-center">Controle de Estoque</h1>
        <div className="w-64 h-1 bg-teal-700"></div>
      </div>
      <div className="w-full flex items-start p-20">
        <Button content={
          <div className="flex gap-2" onClick={() => setModalIsOpen(true)}>
            <FaPlus />
            Cadastrar novo produto
          </div>
        }/>
      </div>
      <DataGrid user_id={userInfo?.id}/>
      <CreateProductModal open={modalIsOpen} setIsOpen={setModalIsOpen}/>
    </div>
  );
};

export default Products;
