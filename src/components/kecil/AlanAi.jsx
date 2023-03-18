import React, { useEffect, useState } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import CardPlants from '../CardPlants';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AlanAi = () => {
    const [allPlants, setAllPlants] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        alanBtn({
          key: '76978b707b1eade6ae51a8bfdc6b73112e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ({ command, plants }) => {
            if(command === 'plantHeadlines') {
              setAllPlants(plants);
              navigate('/allPlants')
            }
          }
        })
      }, [])

  return (
      <>

      </>
  )
}

export default AlanAi