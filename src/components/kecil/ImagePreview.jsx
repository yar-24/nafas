import * as React from "react";
import { Box, Modal, Fade, Backdrop } from "@mui/material";
import { styled } from "@mui/material/styles";
import { mobile } from "../../utils";

const ContainerBox = styled(Box)`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 450px;
  box-shadow: 24;
  ${mobile({ width: "90%" })}
`;

const ProductImage = styled("img")`
  object-fit: cover;
  margin: auto;
  width: 500px;
  height: 450px;
  ${mobile({ height: "100%", width: "100%" })}
`;

const ImagePreview = ({ handleClose, open, idImg }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ContainerBox>
            <ProductImage
              src={`https://res.cloudinary.com/eundangdotcom/image/upload/${idImg}`}
              alt={idImg}
            />
          </ContainerBox>
        </Fade>
      </Modal>
    </div>
  );
};

export default ImagePreview;
