import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  editInterviewAPI,
  getInterviewByUuidAPI,
} from "../../../services/interview";
import { toast } from "react-toastify";
import RightArrow from "@mui/icons-material/KeyboardArrowRightRounded";
import "./TestQuestionList.scss";
import CodeEditor from "./CodeEditor";
import Header from "./Header";
const TestQuestionList = () => {
  const [testData, setTestData] = useState();
  const [editorData, setEditorData] = useState({
    status: false,
    data: null,
    index: null,
  });
  const { uuid } = useParams();
  const toggleEditorStatus = () => {
    setEditorData((prev) => ({ ...prev, status: !prev.status }));
  };

  const openEditor = (data, index) => {
    setEditorData((prev) => ({
      ...prev,
      status: true,
      data: data,
      index: index,
    }));
  };

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

  const handleSubmit = () => {
    const res = window.confirm(
      "Are you sure you want to submit and end the test ?"
    );
    if (res) {
      const payload = testData?.interview;
      editInterviewAPI(payload)
        .then((res) => {
          toast.success("Interview ended, Kindly close the tab", {
            position: "top-right",
          });
          setTimeout(() => {
            localStorage.clear();
            window.open("/login", "_self");
            window.close();
          }, 1000);
        })
        .catch((error) => {
          toast.error(error?.data?.message || error?.toString(), {
            position: "top-right",
          });
        });
    }
  };

  useEffect(() => {
    if (uuid && uuid?.length > 0) getInterviewByUuid();
  }, [uuid]);

  const renderTable = () => {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Question</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {testData?.interview?.questions &&
          testData?.interview?.questions?.length > 0 ? (
            testData?.interview?.questions?.map((question, index) => {
              return (
                <tr onClick={() => openEditor(question, index)}>
                  <td>{index + 1}.</td>
                  <td>{question?.title}</td>
                  {!question?.response || question?.response?.length === 0 ? (
                    <td className="error">Unattempted</td>
                  ) : (
                    <td className="success">Attempted</td>
                  )}
                  <td>
                    <RightArrow />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No Question</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const renderNoData = () => {
    return (
      <Box>
        <Typography fontFamily="Poppins" color="white">
          No Data Available
        </Typography>
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <Box className="body-container">
        <Box className="question-container">
          {testData?.interview ? renderTable() : renderNoData()}
        </Box>
        <Box className="submit-box">
          <Button className="submit-btn" onClick={handleSubmit}>
            Submit & End Test
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="test-question-list-main-container">
      <Header />
      {editorData?.status ? (
        <Box className="body-container">
          <CodeEditor
            editorData={editorData}
            testData={testData}
            setTestData={setTestData}
            toggleEditorStatus={toggleEditorStatus}
          />
        </Box>
      ) : (
        renderBody()
      )}
    </Box>
  );
};

export default TestQuestionList;
