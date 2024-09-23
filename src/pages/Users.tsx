import UsersGrid from '../components/datagrid/UsersGrid';
const Users = () => {

  return (
    <div className="w-screen h-screen flex flex-col gap-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold w-full text-center">Gestão</h1>
        <div className="w-64 h-1 bg-teal-700"></div>
      </div>
      <UsersGrid /> 
    </div>
  );
};

export default Users;
