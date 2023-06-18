import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handleLogininRedux } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ishowPassword, setIsShowPassword] = useState(false);


    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)


    const handleLogin = async () => { 

        dispatch(handleLogininRedux(email, password));
    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handlePressEnter = (event) => {
        if(event && event.key === "Enter") {
            handleLogin();
        }
    }
    useEffect(() => {
          if(account && account.auth === true) {
            navigate("/");
          }
    },[account])

    return (<>
       <div className=" login-container clo-12 col-sm-4">
           <div className="title">Login</div>
           <div className="text">Email or Username(eve.holt@reqres.in)</div>
           <input 
                type='text' 
                placeholder="Email or Username... " 
                value={email}
                onChange={(event) => setEmail(event.target.value)}

            />
           <div className="input-password">
                <input 
                     type= {ishowPassword === true ? 'text':'password'}
                     placeholder="Password..."
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     onKeyDown={(event) => handlePressEnter(event)}
                />
                <i className={ishowPassword === true ? "fas fa-eye": "fas fa-eye-slash"}
                   onClick={() => setIsShowPassword(!ishowPassword)}
                ></i>
            </div>
           <button 
                className={email && password ? "active": ""}
                disabled ={email && password ? false : true}
                onClick={() => handleLogin()}
            >{isLoading && <i class="fas fa-sync fa-spin"></i>}&nbsp;Login</button>
           <div className="back">
            
            <span onClick={() => handleGoBack()} ><i className="fas fa-angle-double-left"></i>&nbsp;Go back</span>
           </div>
       </div> 

    </>)
}

export default Login;
