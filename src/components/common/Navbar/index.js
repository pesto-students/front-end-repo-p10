import { Box, Typography } from "@material-ui/core";
import "./Navbar.scss";
import { NAVBAR_ITEM_LIST } from "../../constant/Navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {
  const [selectedNav, setSelectedNav] = useState("DASHBOARD");
  const [isSuperAdmin,setSuperIsAdmin] = useState(false);
  const navigate = useNavigate();
  const pathName = useLocation()?.pathname;
  const handleNavChange = (key, path) => {
    setSelectedNav(key);
    navigate(path);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(()=>{
    const item = NAVBAR_ITEM_LIST?.find(item=>pathName?.includes(item?.route));
    if(item)
    {
      setSelectedNav(item?.key);
    }
    navigate(pathName);
  },[pathName]);
  
  useEffect(()=>{
    const clientDetails = JSON.parse(localStorage.getItem("clientData"));
    setSuperIsAdmin(clientDetails?.role === "SUPERADMIN");
  },[])
  return (
    <Box className="navbar-main-container">
      <Box className="logo-main">
        <img src="/images/SMART_HIRE_ICON.svg" />
      </Box>
      <Box className="navbar-list">
        {NAVBAR_ITEM_LIST?.map(({ label, key, icon, route, path, isAccessAllowed }) => {
          if(!isSuperAdmin && !isAccessAllowed)
          return <></>
          return (
            <Box
              className={`navbar-single ${
                key == selectedNav ? "selected" : ""
              }`}
              key={key}
              onClick={() => handleNavChange(key,route)}
            >
              <Box>
                <img
                  className={key === selectedNav ? "icon-selected" : ""}
                  src={icon}
                />
              </Box>
              <Typography className="text">{label}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box onClick={handleLogout} className="logout-container">
        <Box>
          <LogoutIcon className="icon"/>
        </Box>
        <Typography className="text">Logout</Typography>
      </Box>
    </Box>
  );
};
export default Navbar;
