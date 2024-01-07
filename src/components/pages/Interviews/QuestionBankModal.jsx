import { Box, Checkbox, Pagination, Typography } from "@mui/material";
import { Modal } from "../../common/Modal/Modal";
import "./QuestionBankModal.scss";

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width:"680px",
  border: `1px solid rgb(132 132 132 / 10%)`,
  borderRadius: "8px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(38, 25, 88, 0.15)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#261958",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const QuestionBankModal = ({
  questionBankModal,
  closeQuestionBank,
  questionData,
  setQuestionData,
  LIMIT,
}) => {
  const title = () => {
    return (
      <Box className="question-bank-modal-title">
        <Typography className="title">Question Bank</Typography>
      </Box>
    );
  };
  const handleSelect = (index) => {
      const copyQuestionData = {...questionData};
      if(!copyQuestionData.data[index].isSelected)
      {
        copyQuestionData.data[index].isSelected = true;
      }
      else
        copyQuestionData.data[index].isSelected =  false;
      setQuestionData(copyQuestionData)
  }

  const body = () => {
    return (
      <Box className="question-bank-modal-body">
        {questionData?.data && questionData?.data?.length > 0 ? (
          questionData?.data?.map((question, index) => {
            return (
              <Box
                display="flex"
                justifyContent="space-evenly"
                gap="4px"
                alignItems="flex-start"
              >
                <Typography
                  minWidth="20px"
                  fontSize="14px"
                  fontWeight="500"
                  color="#261958"
                  marginTop="10px"
                >
                  {" "}
                  {index + 1}.
                </Typography>
                <Box>
                  <Accordion>
                    <AccordionSummary>
                      <Typography
                        fontSize="14px"
                        fontWeight="500"
                        color="#261958"
                      >
                        {question?.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography fontSize="12px" fontWeight="400">
                       {question?.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Box>
                  <Checkbox 
                  onChange={()=>handleSelect(index)}
                  checked={!question?.isSelected?false:true} 
                  size="small" />
                </Box>
              </Box>
            );
          })
        ) : (
          <Box width="100%" display="flex" justifyContent="center">
            <Typography>No Data available</Typography>
          </Box>
        )}
         {questionData?.data && questionData?.data?.length > 0 ? (
            <Box width="100%" display="flex" justifyContent="center" marginTop="22px">
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
    );
  };
  return (
    <Box>
      <Modal
        width="800px"
        height="500px"
        open={questionBankModal?.status}
        onClose={closeQuestionBank}
        title={title()}
        body={body()}
      />
    </Box>
  );
};
export default QuestionBankModal;
