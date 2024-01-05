import moment from "moment";
import { CLIENTS_LIST_TABLE_ROW } from "../../constant/Clients";
import { Box, Typography } from "@mui/material";

const ClientsListTable = ({clientData}) => {
    const renderData = () => {
        return  <tbody>
        {
            clientData?.data?.map((item,index)=>{
                return (
                    <tr>
                            <td>{index+1}.</td>
                            <td>{item?.name}</td>
                            <td>{item?.companyID?.name}</td>
                            <td>{item?.email}</td>
                            <td>{item?.status}</td>
                            <td>{moment(item?.createdAt).format("DD-MM-YY hh:mm a")}</td>
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
                        CLIENTS_LIST_TABLE_ROW?.map(({label}) => {
                            return (
                                <th>{label}</th>
                            )
                        })
                    }
                </thead>
               {
                 clientData?.data && clientData?.data?.length > 0 ?
                 renderData() : 
                 renderNoData()
               }
            </table>
    )
}
export default ClientsListTable;