import ModalMUI from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
export const Modal = ({ height, width, title, body, ...props }) => {
  return (
    <ModalMUI {...props}>
      <Box className="common-shared-modal">
        <Box
          height={height}
          width={width}
          onClick={(e) => e.stopPropagation()}
          className="main-container"
        >
          {title && (
            <>
              <Box className="title-box">
                <Box height="fit-content">{title}</Box>
                <Box height="fit-content">
                  <IconButton onClick={props?.onClose} aria-label="comment">
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
            </>
          )}

          <Box className="body-box">{body}</Box>
        </Box>
      </Box>
    </ModalMUI>
  );
};
