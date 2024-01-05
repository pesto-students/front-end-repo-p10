import moment from "moment";
import { INTERVIEW_TABLE_ROW } from "../../constant/Interviews";
import { Box, Typography } from "@mui/material";

const tableData = [
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
    {
        candidate: {
            name: "Aman",
            email: "aman@yopmail.com",
            contact: "+91 987654321",
            pic: "/images/interviews/profile.svg",
        },
        client: {
            name: "Phone pe",
        },
        interviewer: {
            name: "Vivek singh",
        },
        scheduledDate: {
            date: "01/01/2023",
            time: "10:30 AM",
        },
        score: "80%",
        interview: null,
    },
];


const InteviewTable = ({data}) => {
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
                                        <td>edit</td>
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