import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import "./AddQuestion.scss";
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
import { getAllClientsAPI } from "../../../services/client";

const { ADD_QUESTION } = HEADERS;
const AddQuestion = () => {
  const [formData, setFormData] = useState();
  const [testCases,setTestCases] = useState([{
    input: "",
    output: "",
  }]);
  const [isSuperAdmin,setSuperIsAdmin] = useState(false);
  const [clientData,setClientData] = useState();
  const handleInputChage = (name, e) => {
    const { value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log("==========================",formData)
  console.log("==========================testCases",testCases);


  const handleSubmit = () => {

    const { companyID, title, description, images, solution, code, type, topic, link, testCases } = formData;

    const payload = {
        companyID: companyID,
        title: title || null,
        description: description || null,
        images: images || [],
        solution: solution || null,
        code: code || null,
        type: type || "PUBLIC",
        topic: topic || null,
        link: link || null,
        testCases: testCases || null,
    };
    addQuestionAPI(payload)
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

  const handleAddTestCase = () => {
    setTestCases(prev=>([...prev,{input:"",output:""}]));
  }

  const handleTestCaseChange = (index,name,e) => {
    const {value} = e?.target;
    const copyTestCase = [...testCases];
    copyTestCase[index][name] = value;
    setTestCases(copyTestCase); 
  }
 
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

  useEffect(()=>{
    const tempClientDetails = JSON.parse(localStorage.getItem("clientData"));
    const isAdmin = tempClientDetails?.role === "SUPERADMIN";
    setSuperIsAdmin(isAdmin);
    if(isAdmin)
        getAllClients();
  },[])

  return (
    <Box className="add-question-main-container">
      <Navbar />
      <TopHeader header={ADD_QUESTION} />
      <Box className="wrapper">
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
        <Box className="form-container">
          <Typography className="heading">Question Details</Typography>
          <Box className="form-input">
            <Typography className="label">Title</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("title", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Description</Typography>
            <textarea 
            className="input textarea" 
            rows="4"
            onChange={(e) => handleInputChage("description", e)}></textarea>
          </Box>
          <Box className="form-input">
            <Typography className="label">Solution</Typography>
            <textarea 
            className="input textarea" 
            rows="4"
            onChange={(e) => handleInputChage("solution", e)}></textarea>
          </Box>
          <Box className="form-input">
            <Typography className="label">Code</Typography>
            <textarea 
            className="input textarea code" 
            rows="4"
            onChange={(e) => handleInputChage("code", e)}></textarea>
          </Box>
          <Box className="form-input">
            <Typography className="label">Type</Typography>
            <Select size="small" onChange={(e)=>handleInputChage("type",e)} className="select" value={formData?.type || "PUBLIC"}>
                <MenuItem value="PUBLIC">Public</MenuItem>
                <MenuItem value="PRIVATE">Private</MenuItem>
            </Select>
          </Box>
          <Box className="form-input">
            <Typography className="label">Topic</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("topic", e)}
              type="text"
            />
          </Box>
          <Box className="form-input">
            <Typography className="label">Link</Typography>
            <input
              className="input"
              onChange={(e) => handleInputChage("link", e)}
              type="text"
            />
          </Box>
        </Box>

        <Box className="form-container">
          <Typography className="heading">Test Cases</Typography>
          <Box display="flex" flexDirection="column" gap="22px">
          {
            testCases?.map((item, index)=>{
                return (
                    <Box display="flex" flexDirection="column" gap="4px">
                        {
                            index === 0 ? 
                            <Box display="flex" justifyContent="flex-end">
                                <Button onClick={handleAddTestCase} className="add-btn"><AddIcon className="icon"/></Button>
                            </Box>
                            : null
                        }
                        <Typography className="sub-text">Test {index+1}</Typography>
                    <Box display="flex" flexDirection="column" gap="4px">
                        <Box className="form-input">
                            <Typography className="label">Input</Typography>
                            <input
                            className="input"
                            onChange={(e) => handleTestCaseChange(index,"input", e)}
                            type="text"
                            />
                        </Box>
                        <Box className="form-input">
                            <Typography className="label">Output</Typography>
                            <input
                            className="input"
                            onChange={(e) => handleTestCaseChange(index,"output", e)}
                            type="text"
                            />
                        </Box>
                    </Box>
                   </Box> 
                )
            })
          }

        </Box>
         
        </Box>  

        <Box className="form-container">
          <Box display="flex" justifyContent="flex-end">
            <Button className="submit-btn" onClick={handleSubmit}>
              Add Question
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AddQuestion;
