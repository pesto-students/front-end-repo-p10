import { Box, Button, Input } from "@mui/material";
import "./Profile.scss";
import TopHeader from "../../common/TopHeader";
import { HEADERS } from "../../constant/Header";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Navbar from "../../common/Navbar/index";
import Avatar, { genConfig } from "react-nice-avatar";
import { useEffect, useRef, useState } from "react";
import {
  editSuperAdminDataAPI,
  getClientDataAPI,
  getSuperAdminDataAPI,
} from "../../../services/profile";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { editClientDataAPI } from "../../../services/client";
const config = genConfig({ sex: "man" });

const Profile = () => {
  const { PROFILE } = HEADERS;
  const [clientData, setClientData] = useState();
  const [passType, setPassType] = useState("password");

  const handleInputChage = (name, e) => {
    const { value } = e?.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneInput = (name, value) => {
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordView = () => {
    if (passType === "text") {
      setPassType("password");
    } else {
      setPassType("text");
    }
  };
  const handleSave = () => {
    if (clientData?.role === "SUPERADMIN") {
      editSuperAdminData();
    } else {
      editClientData();
    }
  };
  const editClientData = () => {
    const payload = {
      name: clientData?.name,
      email: clientData?.email,
      phone: clientData?.phone,
      password: clientData?.password,
    };
    editClientDataAPI(payload)
      .then((res) => {
        const data = res?.data;
        toast.success(data?.message, {
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  const editSuperAdminData = () => {
    const payload = {
      name: clientData?.name,
      email: clientData?.email,
      phone: clientData?.phone,
      password: clientData?.password,
    };

    editSuperAdminDataAPI(payload)
      .then((res) => {
        const data = res?.data;
        toast.success(data?.message, {
          position: "top-right",
        });
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  const getSuperAdminData = () => {
    getSuperAdminDataAPI()
      .then((res) => {
        const data = res?.data;
        localStorage.setItem("clientData", JSON.stringify(data?.data));
        setClientData(data?.data);
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  const getClientData = () => {
    getClientDataAPI()
      .then((res) => {
        const data = res?.data;
        localStorage.setItem("clientData", JSON.stringify(data?.data));
        setClientData(data?.data);
      })
      .catch((error) => {
        toast.error(error?.data?.message || error?.toString(), {
          position: "top-right",
        });
      });
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("clientData"));
    if (temp.role === "SUPERADMIN") getSuperAdminData();
    else getClientData();
  }, []);

  return (
    <Box className="profile-main-container">
      <Navbar />
      <TopHeader header={PROFILE} />
      <Box className="wrapper">
        <Box className="container">
          <Box className="left">
            <Avatar className="w-100 h-100" {...config} />
            {/* <img src="/images/interviews/profile.svg"/> */}
          </Box>
          <Box className="right">
            <Box className="form-input">
              <label className="label">Name</label>
              <Input
                type="text"
                className="input"
                onChange={(e) => handleInputChage("name", e)}
                fullWidth
                placeholder=""
                value={clientData?.name}
              />
            </Box>
            <Box className="form-input">
              <label className="label">Email</label>
              <Input
                type="text"
                className="input"
                onChange={(e) => handleInputChage("email", e)}
                fullWidth
                placeholder=""
                value={clientData?.email}
                disabled
              />
            </Box>

            <Box className="form-input">
              <label className="label">Phone</label>
              <PhoneInput
                value={clientData?.phone}
                className="phone-input"
                onChange={(e) => handlePhoneInput("phone", e)}
                country={"in"}
              />
            </Box>

            <Box display="flex" gap="8px" alignItems="flex-end">
              <Box className="form-input">
                <label className="label">Password</label>
                <Input
                  type={passType}
                  className="input"
                  fullWidth
                  onChange={(e) => handleInputChage("password", e)}
                  placeholder="Change password"
                />
              </Box>
              <Box display="flex" gap="8px">
                <Box className="icon">
                  <RemoveRedEyeIcon onClick={togglePasswordView} />
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={handleSave} className="save-btn">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Profile;
