import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';

const AuthLayout = ({children, authentication=true}) => {
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector(state=> state.auth?.status);

    useEffect(()=>{
        // If authentication is required to access some component
        // And if authStatus doesn't match authentication,
        // Then tell the user to login
        if (authentication && authStatus !==authentication) {
            navigate("/login");
        }
        
        // If authentication is not required to access some component
        // And if authStatus doesn't match authentication ie true,
        // Then user can access home route
        else if (!authentication && authStatus!==authentication) {
            navigate("/");
        }
        setLoader(false);
    },[authStatus,navigate,authentication])

  return loader? <Loader /> : <>{children}</>
}

export default AuthLayout
