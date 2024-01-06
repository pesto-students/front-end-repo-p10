import { Box, Typography } from "@mui/material";
import "./TopHeader.scss";
const TopHeader = ({header}) => {
    return (
        <Box className="top-header-main-container">
           <Typography className="header-text"> {header}</Typography>
        </Box>
    )
}
export default TopHeader;