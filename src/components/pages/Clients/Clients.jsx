import { Box, Button, Pagination } from "@mui/material";
import { HEADERS } from "../../constant/Header";
import TopHeader from "../../common/TopHeader";
import "./Clients.scss";
import ClientsListTable from "./Table";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../../common/Navbar/index";
import { useEffect, useState } from "react";
import { getAllClientsAPI } from "../../../services/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LIMIT = 10;
const ClientList = () => {
  const { CLIENTS } = HEADERS;
  const [clientData, setClientData] = useState({
    data: null,
    currentPage: 1,
    currentLimit: LIMIT,
    total: 0,
  });
  const navigate = useNavigate();

  const getAllClients = () => {
    getAllClientsAPI()
      .then((res) => {
        const data = res?.data?.data;
        setClientData((prev) => ({
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
    getAllClients();
  }, []);
  return (
    <Box className="clients-list-main-container">
      <Navbar />
      <TopHeader header={CLIENTS} />
      <Box className="wrapper">
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={()=>navigate('/clients/add')} className="add-client-btn">
            <AddIcon /> &nbsp;Add Client
          </Button>
        </Box>
        <Box className="table-wrapper">
          <ClientsListTable clientData={clientData} />
          {clientData?.data && clientData?.data?.length > 0 ? (
            <Box>
              <Pagination
                count={
                  clientData?.total
                    ? Math.floor(clientData?.total / LIMIT) || 1
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
export default ClientList;
