import { Box, Button, Input } from "@mui/material"
import "./Profile.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Profile = () => {
    const {PROFILE} = HEADERS;
    const renderInput = (label,type) => {
        return (
            <Box className="form-input">
            <label className="label">
                {label}
            </label>
            <Input type={type} className="input" fullWidth placeholder=""/>    
        </Box>
        )
    }
    return <Box className="profile-main-container">
            <TopHeader header={PROFILE}/>
            <Box className="wrapper">
                <Box className="container">
                    <Box className="left">
                        <img src="/images/interviews/profile.svg"/>
                    </Box>
                    <Box className="right">
                        {renderInput("Name")}
                        {renderInput("Email")}
                        {renderInput("Phone")}
                        <Box  display="flex" gap="8px" alignItems="flex-end">
                            {renderInput("Password","password")}
                            <Box display="flex" gap="8px">
                                <Box className="icon">
                                    <EditIcon/>
                                </Box>
                                <Box className="icon">
                                    <RemoveRedEyeIcon/>
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                            <Button className="save-btn">Save</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
    </Box>
}
export default Profile;