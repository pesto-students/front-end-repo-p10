import moment from "moment";
import { INTERVIEW_TABLE_ROW } from "../../constant/Interviews";
import { Box, Typography } from "@mui/material";
import CopyIcon from '@mui/icons-material/ContentCopyRounded';
import DocumentIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InteviewTable = ({data}) => {
    const navigate = useNavigate();
    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
          return;
        }

        navigator.clipboard.writeText(text).then(function() {
            toast.success("Candidate's test link copied", {
                position: "top-right",
              });
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });

      }
    const handleCopy = (item) => {
        const originURL = window.location.origin;
        const url = originURL + "/code-editor/"+item.candidateLink;
        copyTextToClipboard(url);
    }

    const handleResult = (item) => {
        navigate(`/evaluate/${item.interviewerLink}`);
    }
    const renderData = () => {
        return (
<tbody>
                    {
                        data?.map((item,index)=>{
                            return (
                                <tr>
                                        <td>{index+1}.</td>
                                        <td>{item?.candidateName}</td>
                                        <td>{item?.companyID?item?.companyID?.name:"-"}</td>
                                        <td>{item?.interviewerName}</td>
                                        <td>{moment(item?.date*1000).format("DD-MM-YY hh:mm a")}</td>
                                        <td>NA</td>
                                        <td>
                                            <Box className="action-box">
                                                <Box>
                                                    <CopyIcon onClick={()=>handleCopy(item)} className="icon"/>
                                                </Box>
                                                <Box>
                                                    <DocumentIcon onClick={()=>handleResult(item)} className="icon"/>
                                                </Box>
                                            </Box>
                                        </td>
                                    </tr>
                            )
                        })
                    }
                </tbody>
        )
    }
    const renderNoData = () => {
        return (
            <tbody width="100%">
                <tr>
                    <td colSpan="7">
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
                        INTERVIEW_TABLE_ROW?.map(({label}) => {
                            return (
                                <th>{label}</th>
                            )
                        })
                    }
                </thead>
                {
                    data && data?.length > 0? 
                    renderData() :
                    renderNoData()
                }
            </table>
    )
}
export default InteviewTable;