import {
  Card,
  CardActionArea,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import CardPlant from './CardPlant';

const CardPlants = ({ categories, plants }) => {
  const [plantCategory, setPlantCategory] = useState([]);
  let cardChildren;

  const handleClick = (category) => {
    axios
      .get(`https://house-plants2.p.rapidapi.com/category/${category}`, {
        headers: {
          'X-RapidAPI-Key':
            'c32e19a106msh23f655b72c79c38p10d71ajsn65659e9f51bb',
          'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com',
        },
      })
      .then((res) => {
        setPlantCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (plantCategory.length) {
    cardChildren = (
      <>
        {plantCategory.map((plant, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <CardPlant plant={plant} i={i} />
          </Grid>
        ))}
      </>
    );
  } else if (plants.length) {
    cardChildren = (
      <>
        {plants.map((plant, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <CardPlant plant={plant} i={i} />
          </Grid>
        ))}
      </>
    );
  } else {
    cardChildren = (
      <>
        {categories.map((category, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <Card
              sx={{
                mx: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardActionArea
                sx={{ flex: '1', p: 3 }}
                onClick={() => handleClick(category.Category)}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {category.Category}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </>
    );
  }

  return (
    <Container>
      <Stack mt={3}>
        <Typography gutterBottom variant="h4" component="h3" sx={{ mb: 4 }}>
          {plantCategory.length
            ? `This Category ${plantCategory[0].Categories}`
            : plants.length
            ? 'All Plants'
            : 'Choose Categories Plant'}
        </Typography>
        <Grid
          maxWidth="100%"
          container
          rowSpacing={{ xs: 2, md: 3 }}
          direction="row"
        >
          {cardChildren}
        </Grid>
      </Stack>
    </Container>
  );
};

export default CardPlants;
