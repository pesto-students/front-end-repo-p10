import { Box, Button, Typography } from "@mui/material";
import "./Login.scss";
import { useState } from "react";
import { clientLoginAPI } from "../../../services/login";
import { toast } from "react-toastify";
import axios from "../../../services/axios";
import { useNavigate } from "react-router-dom";
const Login = ({isAuthenticated}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleChange = (type,e) => {
        if(type === "email")
        {
            setEmail(e?.target?.value)
        }
        else if(type === "password")
        {
            setPassword(e?.target?.value)
        }
    }
    const handleLogin = () => {
        let isValid = true;
        if(!email || email?.length === 0 )
        {
            isValid = false;
            toast.error("Please type a valid email",{position:"top-right"})
        }
        if(!password || password?.length === 0 )
        {            
            isValid = false;
            toast.error("Please type a valid password",{position:"top-right"})
        }
        if(!isValid)
            return;
        const payload = {
            email,
            password,
        }
        clientLoginAPI(payload).then(res=>{
            const token = res?.data?.token;
            const data = res?.data?.data;
            localStorage.setItem("token",token);
            localStorage.setItem("clientData",JSON.stringify(data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            isAuthenticated.current = true;
            window.location.href = "/dashboard";
        }).catch(error=>{
            toast.error(error?.data?.message || error?.toString(),{
                position: "top-right"
            })
        })
    }

    return <Box className="login-main-container">
                <Box className="box-1">
                    <img height="100%" width="100%" src="/images/login/working-ui.jpg"/>
                </Box>
                <Box className="box-2">
                    <Typography className="title">Smart Hire</Typography>
                    <Box className="form-container">
                        <Box>
                            <input onChange={(e)=>handleChange("email",e)} type="email" placeholder="Enter your email" />
                        </Box>
                        <Box>
                            <input onChange={(e)=>handleChange("password",e)} type="password" placeholder="Enter password"/>
                        </Box>
                        <Box width="100%" display="flex" justifyContent="center">
                            <Button className="submit-btn" onClick={handleLogin}>Login</Button>
                        </Box>
                    </Box>
                </Box>
    </Box>
}
export default Login;