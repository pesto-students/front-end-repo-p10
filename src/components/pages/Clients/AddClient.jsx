import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import "./AddClient.scss";
import Navbar from "../../common/Navbar";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import AddIcon from '@mui/icons-material/Add';
import { addQuestionAPI } from "../../../services/question";
import { addClientAPI, getAllClientsAPI } from "../../../services/client";
import { useNavigate } from "react-router-dom";

const { ADD_CLIENT } = HEADERS;
const AddClient = () => {
  const [formData, setFormData] = useState();
  const [isSuperAdmin,setSuperIsAdmin] = useState(false);
  const [clientData,setClientData] = useState();
  const navigate = useNavigate();
  const handleInputChage = (name, e) => {
    const { value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { companyName, companyEmail, companyPhone, companyLogo, companyExtra, 
            userName, userEmail, userPhone, userPassword } = formData;

    const payload = {
        companyName: companyName || null,
        companyEmail: companyEmail || null,
        companyPhone: companyPhone || null,
        companyLogo: companyLogo || null,
        companyExtra: companyExtra || null,
        userName: userName || null,
        userEmail: userEmail || null,
        userPhone: userPhone || null,
        userPassword: userPassword || null,
    };
    addClientAPI(payload)
      .then((res) => {
        const data = res?.data;
        toast.success(data?.message,{
            position: "top-right"
        })
        navigate("/clients")
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  return (
    <Box className="add-client-main-container">
      <Navbar />
      <TopHeader header={ADD_CLIENT} />
      <Box className="wrapper">
      <Box className="form-container">
          <Typography className="heading">Company Details</Typography>
          <Box className="form-input">
            <Typography className="label">Name</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("companyName", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Email</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("companyEmail", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Phone</Typography>
            <PhoneInput
              className="phone-input"
              onChange={(e) => handlePhoneInput("companyPhone", e)}
              country={"in"}
            />
          </Box>
      </Box>    
        <Box className="form-container">
          <Typography className="heading">User Details</Typography>
          <Box className="form-input">
            <Typography className="label">Name</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("userName", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Email</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("userEmail", e)}
              type="text"
            />
          </Box>
         
        
          <Box className="form-input">
            <Typography className="label">Phone</Typography>
            <PhoneInput
              className="phone-input"
              onChange={(e) => handlePhoneInput("userPhone", e)}
              country={"in"}
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Password</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("userPassword", e)}
              type="password"
            />
          </Box>
        </Box>  

        <Box className="form-container">
          <Box display="flex" justifyContent="flex-end">
            <Button className="submit-btn" onClick={handleSubmit}>
              Add Client
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AddClient;
