import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { styled } from "@mui/material/styles";
import { CardActionArea, Skeleton, Typography, Card, CardActions, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardImage = styled(LazyLoadImage)`
  object-fit: cover;
  object-position: center;
`;

export default function CardPlant({ plant, i }) {

  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/detailPlant/${id}`)
  }

  return (
    <Card sx={{
      mx: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <CardActionArea onClick={()=> handleClick(plant.id)}>
        <CardImage
          height="235"
          width="100%"
          placeholder={
            <Skeleton variant="rectangular" animation="wave" height={"235px"} />
          }
          src={plant.Img}
          alt={plant["Latin name"]}
        />
        <CardContent sx={{ flex: '1' }}>
          <Typography gutterBottom variant="h5" component="div">
            {plant["Latin name"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {plant.Categories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Common name (fr.): {plant["Common name"]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Family: {plant.Family}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Climat: {plant.Climat}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{padding: "0 16px 8px 16px", display: "flex", justifyContent: "space-between"}}>
        <Button size="small">Learn More</Button>
        <Typography variant="h6" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
}
