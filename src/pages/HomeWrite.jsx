import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteService,
  getServices,
} from '../redux/features/services/servicesSlice';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import CustomButton from '../components/CustomButton';
import { getText, truncate } from '../utils';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import LocaleContext from '../contexts/LocaleContext';

const Font = styled.div`
  @media (max-width: 600px) {
    font-size: 13px;
  }
  @media (max-width: 475px) {
    font-size: 10px;
  }
`;

function HomeWrite() {
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const { locale } = React.useContext(LocaleContext);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices())
      .then((res) => {
        setAllPost(res.payload.services);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const userWrite = allPost.filter((post) => post.user === user._id);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009E72',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
          dispatch(deleteService(id))
        );
      }
    });
  };

  return (
    <Container>
      <Stack direction="column" spacing={2} my={7}>
        <Box sx={{ alignSelf: 'center', mb: 5, fontFamily: 'Comfortaa' }}>
          <Font>
            <h1 className="title__homewrite">
              {locale === 'id'
                ? 'Buat blog anda untuk perawatan tanaman'
                : 'Create your blog for plant care'}
            </h1>
          </Font>
          <CustomButton component={Link} to={'/blog/write'}>
            {locale === 'id' ? 'Buat Sekarang' : 'Create Now'}
          </CustomButton>
        </Box>
        {loading ? (
          <Grid
            container
            spacing={{ md: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row">
            {userWrite.map((item, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 345, m: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://res.cloudinary.com/eundangdotcom/image/upload/v1666578066/${item.idImage}`}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getText(truncate(item.desc, 150))}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="success"
                      component={Link}
                      to={`/blog/edit/${item._id}`}
                      size="small">
                      {locale === 'id' ? 'Sunting' : 'Edit'}
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      component={Link}
                      to={`/blog/detail/${item._id}`}
                      size="small">
                      {locale === 'id' ? 'Lihat' : 'See'}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => handleDelete(item._id)}
                      size="small"
                      style={{ marginLeft: '8px' }}>
                      {locale === 'id' ? 'Hapus' : 'Delete'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            Loading...
          </Typography>
        )}
      </Stack>
    </Container>
  );
}

export default HomeWrite;
