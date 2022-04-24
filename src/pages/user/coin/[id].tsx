import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Head from "next/head";

import { api } from '../../../services/api';

import { Box, Flex, SimpleGrid, Text, Image,theme, Spinner, Button } from '@chakra-ui/react';

const Chart = dynamic(()=> import("react-apexcharts"),{
  ssr: false
});

const options = {
    chart: {
      toolbar:{
        show: false,
      },
      zoom:{
        enabled: false,
      },
      foreColor: theme.colors.gray[100]
    },
    grid: {
      show: false,
    },
    dataLabels:{
      enabled: false,
    },
    tooltip:{
      enabled: false,
    },
    xaxis:{
      type: "datetime",
      axiosBorder: {
          color: "blue"
      },
      axisTicks: {
          color: "blue"
      },
      categories: [
        '2021-03-18T00:00:00.000Z:',
        '2021-03-19T00:00:00.000Z:',
        '2021-03-20T00:00:00.000Z:',
        '2021-03-21T00:00:00.000Z:'
      ],
    },
    fill:{
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
} as any;

const series = [
  {name: "serie1", data: [31,120,10,45],}
];

export default  function DataSCoin() {
  //Trasnform actual date for API
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const today = day + '-' + month + '-' + year;
  //Get the coin id in the routes params for API
  const router = useRouter()
  const id = router.query.id
  //The API coin data storage
  const [ coin, setCoin] = useState({
    id: "null",
    symbol: "null",
    image:{
      small: "null"
    },
    market_data:{
      current_price:{
        usd: 432,
      },
      total_volume: {
        usd: 432,
      },
      market_cap:{
        usd: 432,
      }
    },

  });
  //Get in the API for coin informations
  useEffect (()=>{
    const getAPICoinDatas = async ()=>{

    const { data } = await api.get(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${today}&localization=false`)
    //Set on the coin the informations
    setCoin(data)
    }

    getAPICoinDatas();
  }, []);
  //Loading display waiting for API GET
  while(coin.id === "null"){
    return(
      <Flex 
        justify="center"
        align="center"
        h="100vh"
      >    
        <Spinner  w="100px" h="100px"/>       
      </Flex>
    )
  };

  return(
    <>
      <Head>
          <title>{id?.toString().toUpperCase()} | CBank</title>
      </Head>
    
      <SimpleGrid
        justifyItems="flex-start"
        minChildWidth="320px"
        bg="#2C2C2C"     
        h="450px"
        mx={["0em", "1em"]}
        mt="2em"
        p="2em"
      >
            {/* Coin image and chart */}
            <Flex
              flexDir="column"
              align="flex-start"
              justify="flex-start"
              h="100px"
            > 
                {/* Coin image, name and current price */}
                <Flex
                  align="center"
                  justify="flex-start"
                  h="100px"
                  pl={["0.5.em", "3em"]}
                >
                    <Image src={coin.image.small} height='80px' width='80px' alt="Coin icon" /> 
                    <Text fontSize={25} textTransform="capitalize" >  
                            <b> {coin.id} </b> : U${coin.market_data.current_price.usd.toFixed(2)}
                    </Text>
                </Flex>
                {/* Chart display */}
                <Box
                  display={["none",
                  "none",
                  "none",
                  "block"]}
                >
                    <Chart options={options} series={series} type="area" height={350} width={500} />  :                             
                </Box>
            </Flex>
            {/* Coin Informations */}
            <Box
              ml={["0.5em",
              "5em"]}
              mt="1em"
              fontSize={20}
            >
                <Flex align="center">
                  <Text fontWeight="700">Volume :</Text>
                  <Text pl="0.2em"> U$ {coin.market_data.total_volume.usd.toFixed(2)}</Text>
                </Flex>
                  
                <Flex>
                  <Text fontWeight="700">Price :</Text>
                  <Text pl="0.2em">U$ {coin.market_data.current_price.usd.toFixed(2)}</Text>
                </Flex>
                  
                <Flex align="center">
                  <Text fontWeight="700">MarketCap:</Text>
                  <Text pl="0.2em">U$ {coin.market_data.market_cap.usd.toFixed(2)}</Text>
                </Flex>

                <Flex align="center">
                  <Text fontWeight="700">Cod :</Text>
                  <Text pl="1em">{coin.symbol.toUpperCase()}</Text>
                </Flex>
                {/* Button Back for last page */}
                <Button 
                  transition="0.5s"
                  _hover={{
                    cursor: "pointer",
                    opacity: "0.2"
                  }}
                  onClick={()=> router.back()}
                >
                   BACK  
                </Button> 
            </Box>      
      </SimpleGrid>
      </>
  )
};

