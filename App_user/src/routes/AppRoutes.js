import { Routes, Route } from 'react-router-dom'
import TableUser from '../compoments/TableUsers';
import Login from '../compoments/Login';
import Home from '../compoments/Home';
import PrivateRoutes from './PrivateRoutes';
import NotFound from './NotFound';



const AppRoutes = () => {
    return (
        <>
          <Routes>
              <Route path= "/" element = {<Home />} />
              <Route path= "/login" element ={<Login />} />
           <Route
                path="/users"
                element={
                <PrivateRoutes> 
                    <TableUser />
                </PrivateRoutes>
                }
            />
              <Route path= "/*" element ={<NotFound />} />
          </Routes>

        </>
    )
}

export default AppRoutes;