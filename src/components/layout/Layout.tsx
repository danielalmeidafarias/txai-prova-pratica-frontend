import Header from '../navbar/NavBar';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className='w-screen h-auto'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
