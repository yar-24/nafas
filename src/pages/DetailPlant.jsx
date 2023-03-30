import {
  Box,
  Container,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { styled } from "@mui/material/styles";
import { mobile } from "../utils";

const CardImage = styled(LazyLoadImage)`
  object-fit: cover;
  object-position: center;
  height: 500px;
  width: 450;
  ${mobile({ height: "100%", width: "100%", marginBottom: "20px" })}
`;

const DetailPlant = () => {
  const [plant, setPlant] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://house-plants2.p.rapidapi.com/id/${id}`, {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        },
      })
      .then((res) => {
        setPlant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Container>
      <Typography variant="p" component="h2" mt={3}>
        {plant.Categories}
      </Typography>
      <Typography
        variant="p"
        component="h2"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        {plant["Latin name"]}
      </Typography>
      <Stack direction={{ sm: "column", md: "row"}} justifyContent="space-between" spacing={2} mt={3}>
        <Box>
          <Link href={plant.Img} target="_blank">
            <CardImage
              placeholder={
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"235px"}
                />
              }
              src={plant.Img}
              alt={plant["Latin name"]}
            />
          </Link>
        </Box>
        <Box
          sx={{
            width: {md: "50%", sx: "100%"}
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <b>Latin name : </b>{plant["Latin name"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Family : </b>{plant?.Family}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Other name : </b>{plant["Other name"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Common name : </b>{plant["Common name"]? plant["Common name"][0]: "Common name"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Common name (fr.) : </b>{plant["Common name (fr.)"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Categories : </b>{plant.Categories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Origin : </b>{plant.Origin? plant.Origin.join(" & "): "Plant Origin"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Climat : </b>{plant.Climat}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Temperature max. (C°) : </b>{plant["Temperature max"]? plant["Temperature max"].C: "Temperaure max"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Temperature min. (C°) : </b>{plant["Temperature min"]? plant["Temperature min"].C: "Temperature min"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Zone : </b>{plant.Zone? plant.Zone.join(" & ") : "Plant Zone"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Growth : </b>{plant.Growth}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Light ideal : </b>{plant["Light ideal"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Light tolered : </b>{plant["Light tolered"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Watring : </b>{plant.Watering}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Insects : </b>{plant.Insects ? plant.Insects.join(" & "): "Plant insects"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Appeal : </b>{plant.Appeal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Color of leaf : </b>{plant["Color of leaf"]? plant["Color of leaf"].join(", "): "Color of leaf"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Blooming season : </b>{plant["Blooming season"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Avaibility : </b>{plant.Avaibility}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Pot diameter (cm) : </b>{plant["Pot diameter (cm)"]? plant["Pot diameter (cm)"].CM: "Pot diameter (cm)"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Height at purchase (m) : </b>{plant["Height at purchase"]? plant["Height at purchase"].M: "Height at purchase"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Width at purchase (m) : </b>{plant["Width at purchase"]? plant["Width at purchase"].M: "Width at purchase (m)"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Height potential (m) : </b>{plant["Height potential"]? plant["Height potential"].M: "Height potential (m)"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Width potential (m) : </b>{plant["Width potential"]? plant["Width potential"].M: "Width potential (m)"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Available sizes (Pot) : </b>{plant["Available sizes (Pot)"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Bearing : </b>{plant.Bearing}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Pruning : </b>{plant.Pruning}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Style : </b>{plant.Style}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Use : </b>{plant.Use? plant.Use.join(" & ") : "Plant Use"}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default DetailPlant;
