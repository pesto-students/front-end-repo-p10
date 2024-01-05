import { Tab, Tabs } from "@material-ui/core";
import "./Interviews.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import { useEffect, useState } from "react";
import { INTERVIEW_TABS, INTERVIEW_TYPE } from "../../constant/Interviews";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Pagination, Box, Typography } from "@mui/material";
import InteviewTable from "./Table";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../../common/Navbar/index";
import {
  getAllInterviewsAPI,
  getInterviewStatsAPI,
} from "../../../services/interview";
import { toast } from "react-toastify";
const LIMIT = 10;
const InterviewsList = () => {
  const { INTERVIEWS } = HEADERS;
  const { UPCOMING, FAILED, PASSED, CANCELLED } = INTERVIEW_TYPE;
  const [tabList, setTabList] = useState(INTERVIEW_TABS);
  const [selectedTab, setSelectedTab] = useState(UPCOMING);
  const [interviewStats, setInterviewStats] = useState();
  const [pageStats, setPageStats] = useState({
    data: null,
    currentPage: 1,
    currentLimit: LIMIT,
    total: 0,
  });
  const { tab } = useParams();
  const navigate = useNavigate();
  const handleTabChange = (e, key, route) => {
    setSelectedTab(key);
    navigate();
  };

  const getInterviewStats = () => {
    getInterviewStatsAPI()
      .then((res) => {
        const data = res.data?.data;
        setInterviewStats(data);
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

  const getAllInterviews = () => {
    const payload = {
      stage: selectedTab,
      currentPage: 1,
      currentLimit: 10,
    };
    getAllInterviewsAPI(payload)
      .then((res) => {
        const data = res?.data?.data;
        setPageStats((prev) => ({
          ...prev,
          total: data?.metadata?.total,
          data: data?.data,
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

  const handlePageChange = (e, value) => {
    setPageStats((prev) => ({ ...prev, currentPage: value }));
  };

  useEffect(() => {
    if (interviewStats && interviewStats?.length > 0) {
      const temp = INTERVIEW_TABS?.map((tab) => {
        interviewStats?.map((item) => {
          if (tab?.key === item?._id) {
            tab.count = item.count;
          }
        });
        return tab;
      });
      setTabList(temp);
    }
  }, [interviewStats]);

  useEffect(() => {
    getAllInterviews();
  }, [selectedTab, pageStats?.currentPage]);

  useEffect(() => {
    getInterviewStats();
  }, []);

  return (
    <Box className="inteview-list-main-container">
      <Navbar />
      <TopHeader header={INTERVIEWS} />
      <Box className="wrapper">
        <Box display="flex" justifyContent="flex-end">
          <Button
            className="add-interview-btn"
            onClick={() => navigate("/interviews/add")}
          >
            <AddIcon /> &nbsp;Create Interview
          </Button>
        </Box>
        <Box>
          <Tabs className="tabs" value={selectedTab} onChange={handleTabChange}>
            {tabList?.map(({ key, label, route, count }) => {
              return (
                <Tab
                  key={key}
                  className={`tab ${selectedTab === key ? "selected" : ""}`}
                  value={key}
                  label={
                    <Box display="flex" alignItems="center" gap="4px">
                      <Typography
                        className={`label ${
                          selectedTab === key ? "selected-label" : ""
                        }`}
                      >
                        {label}
                      </Typography>
                      <Typography
                        className={`count ${
                          selectedTab === key ? "selected-count" : ""
                        }`}
                      >
                        {count}
                      </Typography>
                    </Box>
                  }
                />
              );
            })}
          </Tabs>
        </Box>
        <Box className="table-wrapper">
          <InteviewTable data={pageStats?.data || []} />
          <Box>
            {pageStats?.data && pageStats?.data?.length > 0 ? (
              <Pagination
                count={
                  pageStats?.total
                    ? Math.floor(pageStats?.total / LIMIT) || 1
                    : 1
                }
                size="large"
                shape="rounded"
                onChange={handlePageChange}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default InterviewsList;
