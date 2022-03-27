import { useRouter } from "next/router";
import {GetServerSideProps } from "next"
import dynamic from 'next/dynamic'

import { api } from '../../services/api';

import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'

interface CoinsProps {
    id: string,
    symbol: string,
    name: string,
    image: string,
    total_volume: number,
    current_price: number,
}

interface CoinProps{
  coinData:  Array<CoinsProps>
}


// const Chart = dynamic(()=> import("react-apexcharts"),{
//   ssr: false
// })

// const options = {
//     chart: {
//       toolbar:{
//         show: false,
//       },
//       zoom:{
//         enabled: false,
//       },
//       foreColor: theme.colors.gray[100]
//     },
//     grid: {
//       show: false,
//     },
//     dataLabels:{
//       enabled: false,
//     },
//     tooltip:{
//       enabled: false,
//     },
//     xaxis:{
//       type: "datetime",
//       axiosBorder: {
//           color: "blue"
//       },
//       axisTicks: {
//           color: "blue"
//       },
//       categories: [
//         '2021-03-18T00:00:00.000Z:',
//         '2021-03-19T00:00:00.000Z:',
//         '2021-03-20T00:00:00.000Z:',
//         '2021-03-21T00:00:00.000Z:'
//       ],
//     },
//     fill:{
//       opacity: 0.3,
//       type: "gradient",
//       gradient: {
//         shade: "dark",
//         opacityFrom: 0.7,
//         opacityTo: 0.3,
//       },
//     },
// } as any;

// const series = [
//   {name: "serie1", data: [31,120,10,45],}
// ]


export default  function DataSCoin() {

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const today = day + '-' + month + '-' + year;
  
  const router = useRouter()
  console.log(router)
  


  return(
  <SimpleGrid
      justifyItems="flex-start"
      minChildWidth="320px"
      bg="#2C2C2C"
      w="70%"
      h="450px"
      m="auto"
      mt="2em"
      p="2em"
      >
        <Flex
            flexDir="column"
            align="flex-start"
            justify="flex-start"
            h="100px"
            >

              <Flex
                align="center"
                justify="flex-start"
                h="100px"
                pl="3em"
                >

                  <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?" height='80px' width='80px' /> 
                  <Text fontSize={25} px="0.2em">  
                      <strong> Biticoin :</strong> R$360.000,00
                  </Text>
              </Flex>
                
              {/* <Chart options={options} series={series} type="area" height={350} width={500} /> */}
        </Flex>

        <Box ml="5em" fontSize={25}> 
            <Flex align="center">
              <Text fontWeight="700">Volume :</Text>
              <Text pl="1em"> 42.000,00</Text>
            </Flex>
              
            <Flex>
              <Text fontWeight="700">Preço :</Text>
              <Text pl="1em">R$:1.000.000</Text>
            </Flex>
              
            <Flex align="center">
              <Text fontWeight="700">Variação :</Text>
              <Text pl="1em">5%</Text>
            </Flex>

            <Flex align="center">
              <Text fontWeight="700">Última Venda  :</Text>
              <Text pl="1em">R$:1.000.000</Text>
            </Flex>

            <Flex align="center">
              <Text fontWeight="700">Volume :</Text>
              <Text pl="1em">R$:1.000.000</Text>
            </Flex>
        </Box>

      
  </SimpleGrid>
  )
}
