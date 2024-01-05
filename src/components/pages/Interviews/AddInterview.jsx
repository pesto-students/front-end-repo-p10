import { Box, Button, Typography } from "@mui/material";
import "./AddInterview.scss";
import Navbar from "../../common/Navbar";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addInterviewAPI } from "../../../services/interview";
import { toast } from "react-toastify";
import moment from "moment";

const { ADD_INTERVIEWS } = HEADERS;
const AddInterview = () => {
  const [formData, setFormData] = useState();
  const handleInputChage = (name, e) => {
    const { value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterviewDate = (value) => {
    setFormData((prev) => ({ ...prev, date: value }));
  };

  const handleSubmit = () => {
    const clientData = JSON.parse(localStorage.getItem("clientData"));
    const companyID = clientData?.companyID;
    const payload = {
      companyID: companyID,
      candidateName: formData?.candidateName || null,
      candidateEmail: formData?.candidateEmail || null,
      candidatePhone: formData?.candidatePhone || null,
      interviewerName: formData?.interviewerName || null,
      interviewerEmail: formData?.interviewerEmail || null,
      interviewerPhone: formData?.interviewerPhone || null,
      date: moment(formData?.date).unix() || null,
    };
    addInterviewAPI(payload)
      .then((res) => {
        const data = res?.data;
        toast.success(data?.message,{
          position: "top-right"
      })
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  return (
    <Box className="add-interview-main-container">
      <Navbar />
      <TopHeader header={ADD_INTERVIEWS} />
      <Box className="wrapper">
        <Box className="form-container">
          <Typography className="heading">Client Details</Typography>
          <Box className="form-input">
            <Typography className="label">Name</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("candidateName", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Email</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("candidateEmail", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Phone</Typography>
            <PhoneInput
              className="phone-input"
              onChange={(e) => handlePhoneInput("candidatePhone", e)}
              country={"in"}
            />
          </Box>
        </Box>

        <Box className="form-container">
          <Typography className="heading">Interviewer Details</Typography>
          <Box className="form-input">
            <Typography className="label">Name</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("interviewerName", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Email</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("interviewerEmail", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Phone</Typography>
            <PhoneInput
              className="phone-input"
              onChange={(e) => handlePhoneInput("interviewerPhone", e)}
              country={"in"}
            />
          </Box>
        </Box>

        <Box className="form-container">
          <Typography className="heading">Interview Details</Typography>
          <Box className="form-input">
            <Typography className="label">Date</Typography>
            <DatePicker
              selected={formData?.date || ""}
              onChange={handleInterviewDate}
              className="input date-picker"
              showTimeSelect
              dateFormat="d MMMM, yyyy h:mm aa"
            />
          </Box>
        </Box>
        <Box className="form-container">
          <Box display="flex" justifyContent="flex-end">
            <Button className="submit-btn" onClick={handleSubmit}>
              Create Interview
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AddInterview;
