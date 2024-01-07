import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import "./Evaluate.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editInterviewAPI,
  getInterviewByUuidAPI,
} from "../../../services/interview";
import moment from "moment";
import { INTERVIEW_TYPE } from "../../constant/Interviews";
const Evaluate = () => {
  const [testData, setTestData] = useState();
  const [formData, setFormData] = useState();
  const { uuid } = useParams();
  const navigate = useNavigate();

  const getInterviewByUuid = () => {
    const payload = {
      uuid,
    };
    getInterviewByUuidAPI(payload)
      .then((res) => {
        const data = res?.data?.data;
        setTestData(data);
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  const handleInputChage = (name, e) => {
    const { value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { score, stage } = formData;
    const payload = { ...testData.interview };
    payload["score"] = score;
    payload["stage"] = stage;
    editInterviewAPI(payload)
      .then((res) => {
        toast.success("Result updated successfully", {
          position: "top-right",
        });
        navigate("/interviews");
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  useEffect(() => {
    if (uuid && uuid?.length > 0) getInterviewByUuid();
  }, [uuid]);
  return (
    <Box className="evaluate-main-container">
      <Box className="header-box">
        <Typography className="header">Test Evaluation</Typography>
      </Box>
      <Box className="content-box">
        <Box>
          <Box className="candidate-box">
            <Box className="candidate-inner-box">
              <Box className="row">
                <Typography className="text-1">Name:</Typography>
                <Typography className="text-2">
                  {testData?.interview?.candidateName}
                </Typography>
              </Box>
              <Box className="row">
                <Typography className="text-1">Email:</Typography>
                <Typography className="text-2">
                  {testData?.interview?.candidateEmail}
                </Typography>
              </Box>
              <Box className="row">
                <Typography className="text-1">Phone:</Typography>
                <Typography className="text-2">
                  {testData?.interview?.candidatePhone}
                </Typography>
              </Box>
              <Box className="row">
                <Typography className="text-1">Test Date:</Typography>
                <Typography className="text-2">
                  {moment(testData?.interview?.date * 1000).format(
                    "DD-MM-YYYY"
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="action-box">
            <Box display="flex" gap="4px" flexDirection="column">
              <Typography className="text-1">
                Score <span className="text-1-1">(in %)</span>
              </Typography>
              <Box>
                <input
                  className="input"
                  onChange={(e) => handleInputChage("score", e)}
                  type="text"
                />
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography className="text-1">Interview Stage</Typography>
              <Box>
                <Select
                  size="small"
                  placeholder="select stage"
                  onChange={(e) => handleInputChage("stage", e)}
                  className="select"
                >
                  {Object.entries(INTERVIEW_TYPE).map(([key, value]) => {
                    return <MenuItem value={key}>{value}</MenuItem>;
                  })}
                </Select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={handleSubmit} className="submit-btn">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="question-box">
          {testData?.interview?.questions?.map((question, index) => {
            return (
              <Box className="question-inner-box">
                <Typography className="heading">
                  Question {index + 1}.
                </Typography>
                <Typography className="title"> {question?.title}</Typography>
                <Typography className="description">
                  {question?.description}
                </Typography>
                <Typography className="heading">Response</Typography>
                <Typography className="response">
                  <pre>
                    <code>{question?.response}</code>
                  </pre>
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default Evaluate;
