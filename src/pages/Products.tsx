import Button from "../components/buttons/Button";
import { FaPlus } from "react-icons/fa";
import DataGrid from '../components/datagrid/DataGrid';

const Products = () => {
  return ( 
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold w-full text-center">Controle de Estoque</h1>
        <div className="w-64 h-1 bg-teal-700"></div>
      </div>
      <div className="w-full flex items-start p-20">
        <Button content={
          <div className="flex gap-2">
            <FaPlus />
            Cadastrar novo produto
          </div>
        }/>
      </div>

      <DataGrid />
    </div>
  );
};

export default Products;
