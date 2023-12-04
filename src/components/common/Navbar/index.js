import { Box, Typography } from "@material-ui/core";
import "./Navbar.scss";
import { NAVBAR_ITEM_LIST } from "../../constant/Navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [selectedNav, setSelectedNav] = useState("DASHBOARD");
  const navigate = useNavigate();
  const pathName = useLocation()?.pathname;
  const handleNavChange = (key, path) => {
    setSelectedNav(key);
    navigate(path);
  };
  useEffect(()=>{
    const item = NAVBAR_ITEM_LIST?.find(item=>item?.route === pathName);
    if(item)
    {
      setSelectedNav(item?.key);
    }
    navigate(pathName);
  },[pathName]);
  return (
    <Box className="navbar-main-container">
      <Box className="logo-main">
        <img src="/images/SMART_HIRE_ICON.svg" />
      </Box>
      <Box className="navbar-list">
        {NAVBAR_ITEM_LIST?.map(({ label, key, icon, route, path }) => {
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
    </Box>
  );
};
export default Navbar;
