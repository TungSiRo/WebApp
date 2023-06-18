import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogoutinRedux } from '../redux/actions/userActions';
import { useEffect } from 'react';


const Header = (pros) => {
    
    const navigate = useNavigate();
    
    const user = useSelector(state => state.user.account)
    const dispatch = useDispatch();
    
    const handleLogout = () => { 
      dispatch(handleLogoutinRedux())
    }
    useEffect(() => {
      if(user && user.auth === false && window.location.pathname !== "/login") {
          navigate("/");
          toast.success("Log out success!");
      }
    },[user])
    return (<>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href="/">
          <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
          /> <span>Porject-React-Bootstrap</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === '/') &&
          <>
             <Nav className="me-auto">
                <NavLink to= "/" className='nav-link'>Home</NavLink>
                <NavLink to= "/users" className='nav-link'>Manage Users</NavLink>
             </Nav>
             <Nav>
                {user && user.email && <span className='nav-link' style={{color: "Green"}}> WellCome {user.email}!</span>}
                <NavDropdown title="Setting">
                    {user && user.auth === true
                      ? <NavDropdown.Item onClick={() => handleLogout()} >Logout</NavDropdown.Item>
                      : <NavLink to= "/login" className='dropdown-item'>Login</NavLink>              
                    }
                </NavDropdown>
             </Nav>
          </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}

export default Header;
