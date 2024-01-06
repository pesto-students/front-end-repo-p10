import { Box, Button, Typography } from "@mui/material";
import "./CodeEditor.scss";

import AceEditor from "react-ace";
import SendIcon from "@mui/icons-material/Send";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import BackArrowIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect, useRef, useState } from "react";
import { getJobStatusAPI, runCodeAPI } from "../../../services/codeEditor";
import { JOB_STATUS } from "../../constant/CodeEditor";
import moment from "moment";
import Header from "./Header";
import { toast } from "react-toastify";

const POLLING_INTERVAL = 1000;
const resetJobInfo = () => {
  return {
    id: null,
    status: JOB_STATUS.INITIAL,
    data: null,
  };
};

const CodeEditor = ({ editorData, testData, setTestData, toggleEditorStatus }) => {
  const [code, setCode] = useState();
  const [jobInfo, setJobInfo] = useState(resetJobInfo());
  const timerRef = useRef();

  const handleCodeChange = (text) => {
    setCode(text);
  };

  const runCode = () => {
    const payload = {
      lang: "py",
      code: code,
    };
    if (!code && code?.length === 0) return;
    setJobInfo(resetJobInfo());
    runCodeAPI(payload)
      .then((res) => {
        const { data } = res;
        setJobInfo((prev) => ({
          ...prev,
          id: data?.job_id,
          status: JOB_STATUS.PENDING,
        }));
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  const getJobStatus = () => {
    const params = {
      job_id: jobInfo?.id,
    };
    getJobStatusAPI(params)
      .then((res) => {
        const { data } = res;
        const status = data?.job?.status;
        setJobInfo((prev) => ({ ...prev, status: status, data: data }));
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };
  const startPolling = () => {
    getJobStatus();
  };
  const stopPolling = () => {
    clearInterval(timerRef.current);
  };



  useEffect(()=>{
    if(code)
    {
      const copyTestData = {...testData};
      copyTestData.interview.questions[editorData.index || 0].response = code; 
      setTestData(copyTestData);
    }
  },[code])

  useEffect(() => {
    if (
      jobInfo?.id &&
      (jobInfo?.status === JOB_STATUS.INITIAL ||
        jobInfo?.status === JOB_STATUS.PENDING)
    ) {
      timerRef.current = setInterval(startPolling, POLLING_INTERVAL);
    }
    if (
      jobInfo?.status === JOB_STATUS?.SUCCESS ||
      jobInfo?.status === JOB_STATUS?.ERROR
    ) {
      // setJobInfo(resetJobInfo())
      stopPolling();
    }
    return () => clearInterval(timerRef?.current);
  }, [jobInfo]);

  useEffect(()=>{
    setCode(testData.interview.questions[editorData.index || 0].response || "");
  },[])

  const renderStatus = () => {
    const getCss = () => {
      if (jobInfo?.status === JOB_STATUS?.PENDING) return "pending";
      else if (jobInfo?.status === JOB_STATUS?.SUCCESS) return "success";
      else if (jobInfo?.status === JOB_STATUS?.ERROR) return "error";
    };
    return (
      <Box className="status-wrapper">
        <Box display="flex" alignItems="center" gap="4px">
          <Box height="fit-content" display="flex">
            {jobInfo?.status === JOB_STATUS.PENDING ? (
              <AutorenewIcon className={`icon pending-icon ${getCss()}`} />
            ) : jobInfo?.status === JOB_STATUS.SUCCESS ? (
              <DoneAllIcon className={`icon ${getCss()}`} />
            ) : jobInfo?.status === JOB_STATUS?.ERROR ? (
              <DoDisturbIcon className={`icon ${getCss()}`} />
            ) : null}
          </Box>
          {jobInfo?.status !== JOB_STATUS?.INITIAL ? (
            <Typography className={`status-text ${getCss()}`}>
              {jobInfo?.status}
            </Typography>
          ) : null}
        </Box>
        {jobInfo?.data?.job?.startedAt ? (
          <Box display="flex" alignItems="center" gap="4px">
            <Typography className={`status-text ${getCss()}`}>
              Started At:
            </Typography>
            <Typography className={`status-text ${getCss()}`}>
              {moment(jobInfo?.data?.job?.startedAt).format("hh:mm:ss")}
            </Typography>
          </Box>
        ) : null}
        {jobInfo?.data?.job?.completedAt ? (
          <Box display="flex" alignItems="center" gap="4px">
            <Typography className={`status-text ${getCss()}`}>
              Completed At:
            </Typography>
            <Typography className={`status-text ${getCss()}`}>
              {moment(jobInfo?.data?.job?.completedAt).format("hh:mm:ss")}
            </Typography>
          </Box>
        ) : null}
        {jobInfo?.data?.job?.startedAt && jobInfo?.data?.job?.completedAt ? (
          <Box display="flex" alignItems="center" gap="4px">
            <Typography className={`status-text ${getCss()}`}>
              Total Time:
            </Typography>
            <Typography className={`status-text ${getCss()}`}>
              {moment(jobInfo?.data?.job?.completedAt).diff(
                jobInfo?.data?.job?.startedAt,
                "seconds"
              )}{" "}
              seconds
            </Typography>
          </Box>
        ) : null}
        {jobInfo?.data?.job?.output ? (
          <Box display="flex" alignItems="center" gap="4px">
            <Typography className={`output-text`}>Output:</Typography>
            <Typography className={`output-text`}>
              {jobInfo?.data?.job?.output}
            </Typography>
          </Box>
        ) : null}
      </Box>
    );
  };

  const sideBar = () => {
    return <Box className="side-bar-container">
              <Box onClick={toggleEditorStatus} className="back-box">
                <BackArrowIcon className="back-icon"/>
              </Box>
    </Box>;
  };
  const questionBox = () => {
    return (
      <Box className="question-box-container">
        <Typography className="ques-title">
          {editorData?.data?.title}
        </Typography>
        <Typography className="ques-desc">
          {editorData?.data?.description}
        </Typography>
      </Box>
    );
  };
  const renderOutputBox = () => {
    return <Box className="output-box-container">{renderStatus()}</Box>;
  };
  const codeBox = () => {
    return (
      <Box className="code-box-container">
        <Box className="menu-bar">
          <Box>
            <select className="select-main" value="python">
              <option value="">Select Language</option>
              <option value="python">python</option>
            </select>
          </Box>
          <Box>
            <Button onClick={runCode} size="small" className="green-btn">
              Run code &nbsp; <SendIcon className="icon" fontSize="18" />
            </Button>
          </Box>
        </Box>
        <Box className="text-editor">
          <AceEditor
            height="100%"
            width="100%"
            placeholder=""
            mode="python"
            theme="terminal"
            name="text-editor-id"
            value={code}
            onChange={handleCodeChange}
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            setOptions={{
              useWorker: false,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </Box>
        <Box className="result-box">
          <Box className="tab-main">
            <Typography className="text selected">Output</Typography>
          </Box>
          <Box height="75%" padding="8px 12px" overflow="auto">
            {renderOutputBox()}
          </Box>
        </Box>
      </Box>
    );
  };
  const contentBox = () => {
    return (
      <Box className="content-box-container">
        {sideBar()}
        {questionBox()}
        {codeBox()}
      </Box>
    );
  };
  return <Box className="code-editor-main-container">{contentBox()}</Box>;
};

export default CodeEditor;
