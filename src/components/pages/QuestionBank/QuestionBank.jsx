import "./QuestionBank.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import QuestionBankTable from "./Table";
import { Button, Pagination, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../../common/Navbar/index";
import { useEffect, useState } from "react";
import { getAllQuestionsAPI } from "../../../services/question";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LIMIT = 10;
const QuestionBankList = () => {
  const { QUESTION_BANK } = HEADERS;

  const [questionData, setQuestionData] = useState({
    data: null,
    currentPage: 1,
    currentLimit: LIMIT,
    total: 0,
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    getAllQuestions();
  }, []);
  return (
    <Box className="question-bank-main-container">
      <Navbar />
      <TopHeader header={QUESTION_BANK} />
      <Box className="wrapper">
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={()=>navigate('/question-bank/add')} className="add-ques-btn">
            <AddIcon /> &nbsp;Add Question
          </Button>
        </Box>
        <Box className="table-wrapper">
          <QuestionBankTable questionData={questionData} />
          {questionData?.data && questionData?.data?.length > 0 ? (
            <Box>
              <Pagination
                count={
                  questionData?.total
                    ? Math.floor(questionData?.total / LIMIT) || 1
                    : 1
                }
                size="large"
                shape="rounded"
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
export default QuestionBankList;
