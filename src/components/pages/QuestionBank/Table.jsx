import moment from "moment";
import { QUESTION_BANK_TABLE_ROW } from "../../constant/QuestionBank";
import { Box, Typography } from "@mui/material";

const QuestionBankTable = ({questionData}) => {
    const renderData = () => {
        return <tbody>
            {
                        questionData?.data?.map((question,index)=>{
                            return (
                                <tr>
                                        <td>{index+1}.</td>
                                        <td>{question?.title}</td>
                                        <td>{question?.type}</td>
                                        <td>{question?.companyID?.name || "-"}</td>
                                        <td>{moment(question?.createdAt).format("DD-MM-YY hh:mm a")}</td>
                                        <td>edit</td>
                                    </tr>
                            )
                        })
                    }
        </tbody>
    }

    const renderNoData = () => {
        return (
            <tbody width="100%">
                <tr>
                    <td colSpan="6">
                        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
                            <Typography>No Data Available</Typography>
                        </Box>
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
            <table className="table-main">
                <thead>
                    {
                        QUESTION_BANK_TABLE_ROW?.map(({label}) => {
                            return (
                                <th>{label}</th>
                            )
                        })
                    }
                </thead>
                    {
                        questionData?.data && questionData?.data?.length > 0 ?
                        renderData() :
                        renderNoData()
                    }
            </table>
    )
}
export default QuestionBankTable;