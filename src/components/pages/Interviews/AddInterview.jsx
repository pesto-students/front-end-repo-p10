import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import "./AddInterview.scss";
import Navbar from "../../common/Navbar";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { addInterviewAPI } from "../../../services/interview";
import { toast } from "react-toastify";
import moment from "moment";
import { getAllClientsAPI } from "../../../services/client";
import { useNavigate } from "react-router-dom";
import QuestionBankModal from "./QuestionBankModal";
import { getAllQuestionsAPI } from "../../../services/question";

const LIMIT = 10;
const { ADD_INTERVIEWS } = HEADERS;
const AddInterview = () => {
  const [formData, setFormData] = useState();
  const [clientData,setClientData] = useState();
  const [isSuperAdmin,setSuperIsAdmin] = useState(false);
  const [questionBankModal,setQuestionBankModal] = useState({
      status: false,
      data: null,
  });
  const [questionData, setQuestionData] = useState({
    data: null,
    currentPage: 1,
    currentLimit: LIMIT,
    total: 0,
  });
  const [selectedQuestion,setSelectedQuestion] = useState([]);
  const navigate = useNavigate();
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
      companyID: companyID || formData?.companyID || null,
      candidateName: formData?.candidateName || null,
      candidateEmail: formData?.candidateEmail || null,
      candidatePhone: formData?.candidatePhone || null,
      interviewerName: formData?.interviewerName || null,
      interviewerEmail: formData?.interviewerEmail || null,
      interviewerPhone: formData?.interviewerPhone || null,
      date: moment(formData?.date).unix() || null,
      questions:selectedQuestion,
    };
    addInterviewAPI(payload)
      .then((res) => {
        const data = res?.data;
        toast.success(data?.message,{
          position: "top-right"
      })
      navigate("/interviews",{
        replace: true,
      });
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  const getAllClients = () => {
    getAllClientsAPI()
      .then((res) => {
        const data = res?.data?.data;
        setClientData((prev) => ({
          ...prev,
          data: data?.data,
          total: data?.metadata?.total,
        }));
      })
      .catch((error) => {
        toast.error(
          error?.data?.message || error?.data?.toString() || error?.toString(),
          {
            position: "top-right",
          }
        );
      });
  };

  const getAllQuestions = () => {
    getAllQuestionsAPI()
      .then((res) => {
        const data = res?.data?.data;
        setQuestionData((prev) => ({
          ...prev,
          data: data?.data,
          total: data?.metadata?.total,
        }));
      })
      .catch((error) => {
        toast.error(
          error?.data?.message || error?.data?.toString() || error?.toString(),
          {
            position: "top-right",
          }
        );
      });
  };

  const openQuestionBank = () => {
    setQuestionBankModal(prev=>({...prev,status: true}));
  }

  const closeQuestionBank = () => {
    setQuestionBankModal(prev=>({...prev,status: false}));
  }

  useEffect(()=>{
    if(questionBankModal.status === false)
    {
      let arr = [];
      questionData?.data?.map(item=>{
          if(item.isSelected)
          {
            arr.push(item);
          }
      })
      setSelectedQuestion(arr);

    }
  },[questionBankModal])

  useEffect(()=>{
    const tempClientDetails = JSON.parse(localStorage.getItem("clientData"));
    const isAdmin = tempClientDetails?.role === "SUPERADMIN";
    setSuperIsAdmin(isAdmin);
    if(isAdmin)
        getAllClients();
    
    getAllQuestions();  
  },[])
  return (
    <Box className="add-interview-main-container">
      <Navbar />
      <TopHeader header={ADD_INTERVIEWS} />
      <Box className="wrapper">
        {
          isSuperAdmin ? 
          <Box className="form-container">
              <Typography className="heading">Client Details</Typography>
              <Box className="form-input">
                <Typography className="label">Client</Typography>
                <Select size="small" placeholder="select client" onChange={(e)=>handleInputChage("companyID",e)} className="select">
                    {
                      clientData?.data && clientData?.data?.map(client=>{
                            return (
                                <MenuItem value={client?.companyID?._id}>{client?.companyID?.name}</MenuItem>
                            )
                        })
                    }
                </Select>
              </Box>
          </Box>    
          :null
        }

        <Box className="form-container">
          <Typography className="heading">Candidate Details</Typography>
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
            <Typography className="label">Question</Typography>
            <Box className="question-container">
            {
              selectedQuestion?.map((question,index)=>{
                return <Box className="question-box">
                  <Typography className="question-title">{index+1}.</Typography>
                  <Typography className="question-title">{question?.title}</Typography>
                  </Box>
              })
            }
          </Box> 
            <Button className="ques-bank-btn" onClick={openQuestionBank}>
              Question Bank
            </Button>
          </Box>
          <QuestionBankModal
          questionBankModal={questionBankModal}
          closeQuestionBank={closeQuestionBank}
          questionData={questionData}
          setQuestionData={setQuestionData}
          LIMIT={LIMIT}
          />
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
