import {Tab, Tabs } from "@material-ui/core";
import "./Interviews.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import { useState } from "react";
import { INTERVIEW_TABS, INTERVIEW_TYPE } from "../../constant/Interviews";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Pagination,Box } from "@mui/material";
import InteviewTable from "./Table";
import AddIcon from '@mui/icons-material/Add';

const InterviewsList = () => {
    const {INTERVIEWS} = HEADERS;
    const {UPCOMING, FAILED, PASSED, CANCELLED} = INTERVIEW_TYPE;
    const [selectedTab,setSelectedTab] = useState(UPCOMING);
    const {tab} = useParams();
    const navigate = useNavigate();
    console.log("===========params",tab)
    const handleTabChange = (e,key,route) => {
        setSelectedTab(key);
        navigate();
    }
 
    return <Box className="inteview-list-main-container">
            <TopHeader header={INTERVIEWS}/>
            <Box className="wrapper">
                <Box display="flex" justifyContent="flex-end">
                    <Button className="add-interview-btn"><AddIcon/> &nbsp;Create Interview</Button>
                </Box>
                <Box>
                    <Tabs
                    className="tabs"
                    value={selectedTab}
                    onChange={handleTabChange}
                    >
                        {
                            INTERVIEW_TABS?.map(({key,label,route})=>{
                                return (
                                    <Tab key={key} className={`tab ${selectedTab === key? 'selected':''}`} value={key} label={label} />
                                )
                            })
                        }
                    </Tabs>
                </Box>
                <Box className="table-wrapper">
                    <InteviewTable/>
                    <Box>
                        <Pagination count={10} size="large" shape="rounded" />
                    </Box>
                </Box>

            </Box>
    </Box>
}
export default InterviewsList;