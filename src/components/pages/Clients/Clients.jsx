import { Box, Button, Pagination } from "@mui/material"
import { HEADERS } from "../../constant/Header";
import TopHeader from "../../common/TopHeader";
import "./Clients.scss";
import ClientsListTable from "./Table";
import AddIcon from '@mui/icons-material/Add';
const ClientList = () => {
    const {CLIENTS} = HEADERS;
    return <Box className="clients-list-main-container">
            <TopHeader header={CLIENTS}/>
            <Box className="wrapper">
                <Box display="flex" justifyContent="flex-end">
                    <Button className="add-client-btn"><AddIcon/> &nbsp;Add Client</Button>
                </Box>
                <Box className="table-wrapper">
                    <ClientsListTable/>
                    <Box>
                        <Pagination count={10} size="large" shape="rounded" />
                    </Box>
                </Box>
            </Box>
    </Box>
}
export default ClientList;