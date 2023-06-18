import React from 'react';
import './App.scss';
import Header from './compoments/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userActions';
function App() {
   const dispatch = useDispatch();

      useEffect(() => {
      if(localStorage.getItem("token")) {
         dispatch(handleRefresh());
        // loginContext(localStorage.getItem("email"),localStorage.getItem("token"))
      }
   },[])
  return (
    <>
    <div className='app-container'>
       <Header /> 
       <Container>
         <AppRoutes />
       </Container>
    </div>
    <ToastContainer
       position="bottom-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
    />
    </>
  );
}

export default App;

