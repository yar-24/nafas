import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Container, Stack, Box } from '@mui/material';
import CardItem from './CardItem';
import { fonts } from '../utils';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux/features/products/productSlice';
import Swal from 'sweetalert2';
import SkeletonCardItem from './kecil/SkeletonCardItem';
import { useParams } from 'react-router-dom';

const TitleText = styled(Typography)`
  font-family: ${fonts.comfortaa};
  font-weight: 700;
  margin: 32px 0;
`;

const CardList = ({ children }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };

  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProducts())
      .then((res) => {
        const data = res.payload;
        setproducts(data);
        setIsLoading(true);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err,
        });
      });
  }, [dispatch]);

  // filtering product with params id product on url
  const filterProducts = products.filter((product) => product._id !== id);

  return (
    <Container sx={{ padding: 0 }} disableGutters fixed>
      <TitleText sx={{ px: 3 }} variant="h5" component="h2">
        {children}
      </TitleText>
      <Stack mx={1} my={5}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {(!isLoading ? Array.from(new Array(4)) : filterProducts).map(
            (product, index) => (
              <Box sx={{ mx: 2 }} key={index}>
                {product ? (
                  <CardItem product={product} />
                ) : (
                  <SkeletonCardItem />
                )}
              </Box>
            )
          )}
        </Carousel>
      </Stack>
    </Container>
  );
};
export default CardList;
