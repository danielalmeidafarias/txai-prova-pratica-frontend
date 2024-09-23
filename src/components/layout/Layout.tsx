import Header from '../navbar/NavBar';
import Footer from '../footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import useUserStore from '../../state/userStore';
import { useEffect } from 'react';


const Layout = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate()
  console.log(navigate)

  useEffect(() => {
    if(!userInfo) {
      // navigate('/login')
    }
  }, [userInfo])
  
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
