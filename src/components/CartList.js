import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, Container, Box} from "@mui/material";
import CartItem from "./CartItem";
import { colors, fonts } from "../utils";
import { ShoppingCart } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import { Cart1, Cart2, Cart3 } from "../images/img";
import LocaleContext from "../contexts/LocaleContext";

const CartListContainer = styled(Container)`
  margin-top: 60px;
`;

const ContainerHarga = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.secondary};
  padding: 20px 0px;
`;
const ListHarga = ({ textHarga, totalHarga }) => {
  return (
    <ContainerHarga>
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontFamily: fonts.inter, fontWeight: 600 }}
      >
        {textHarga}
      </Typography>
      <Typography sx={{ marginRight: "50px", fontWeight: 600 }}>
        {totalHarga}
      </Typography>
    </ContainerHarga>
  );
};

const CartList = () => {
  const { locale } = React.useContext(LocaleContext);

  return (
    <CartListContainer>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontFamily: fonts.comfortaa }}
      >
        {locale === 'id' ? 'Keranjang anda' : 'Your bag'}
      </Typography>
      <CartItem
        src={Cart1}
        name="Book The Inspired House Plant"
        price="10"
      />
      <CartItem src={Cart2} name="Cactus" height="40-50 cm" price="30" />
      <CartItem src={Cart3} name="Snake plant" height="70-80 cm" price="40" />
      <ListHarga textHarga="Subtotal" totalHarga="100k" />
      <ListHarga textHarga= {locale === 'id' ? 'Pengiriman' : 'Delivery'} totalHarga="Free" />
      <ListHarga textHarga="Total" totalHarga="100k" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0px",
        }}
      >
        <CustomButton
          startIcon={<ShoppingCart />}
          size="large"
          sx={{ alignSelf: "center", width: "50%", fontSize: "20px" }}
        >
           {locale === 'id' ? 'Pesan Sekarang' : 'Place Order'}
        </CustomButton>
      </Box>
    </CartListContainer>
  );
};
export default CartList;
