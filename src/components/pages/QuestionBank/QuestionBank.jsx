import "./QuestionBank.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import QuestionBankTable from "./Table";
import { Button, Pagination, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const QuestionBankList = () => {
    const {QUESTION_BANK} = HEADERS;
    return <Box className="question-bank-main-container">
            <TopHeader header={QUESTION_BANK}/>
            <Box className="wrapper">
                <Box display="flex" justifyContent="flex-end">
                    <Button className="add-ques-btn"><AddIcon/> &nbsp;Add Question</Button>
                </Box>
                <Box className="table-wrapper">
                    <QuestionBankTable/>
                    <Box>
                        <Pagination count={10} size="large" shape="rounded" />
                    </Box>
                </Box>
                

            </Box>
    </Box>
}
export default QuestionBankList;