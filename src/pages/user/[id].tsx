// import dynamic from 'next/dynamic'
import { GetServerSideProps } from "next"
import { api } from '../../services/api';

import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'

interface CoinProps{
  coin:{
    id: string,
    symbol: string,
    image: string,
    market_cap: number,
    total_volume: number,
    current_price: number,
  }
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

export default  function DataSCoin({coin}: CoinProps) {

  if(coin){
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

                      <img src={coin.image} height='80px' width='80px' /> 
                      <Text fontSize={25} textTransform="capitalize"  px="0.2em">  
                            <strong> {coin.id} :</strong> {coin.current_price}
                      </Text>
                  </Flex>
                    
                  {/* <Chart options={options} series={series} type="area" height={350} width={500} /> */}
            </Flex>

            <Box ml="5em" mt="1em" fontSize={20}> 
                <Flex align="center">
                  <Text fontWeight="700">Volume :</Text>
                  <Text pl="1em"> {coin.total_volume}</Text>
                </Flex>
                  
                <Flex>
                  <Text fontWeight="700">Preço :</Text>
                  <Text pl="1em">{coin.current_price}</Text>
                </Flex>
                  
                <Flex align="center">
                  <Text fontWeight="700">MarketCap:</Text>
                  <Text pl="1em">{coin.market_cap}</Text>
                </Flex>

                <Flex align="center">
                  <Text fontWeight="700">Cod :</Text>
                  <Text pl="1em">{coin.symbol}</Text>
                </Flex>
            </Box>

          
      </SimpleGrid>
      )
  }
  return(
    <h1>Página not found</h1>
    )
  }


export const getServerSideProps: GetServerSideProps = async({req, params})=>{

  try {
          
    const { id } = params

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const today = day + '-' + month + '-' + year;

    const { data } = await api.get(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${today}&localization=false`)
    
    const coin =  {
          id: data.id,
          symbol: data.symbol.toUpperCase(),
          image: data.image.small,
          current_price: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', 
          }).format(data.market_data.current_price.usd),
          total_volume: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', 
          }).format(data.market_data.total_volume.usd),
          market_cap: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD', 
          }).format(data.market_data.market_cap.usd),
    }
    
    return{
      props:{
        coin
      }
    }
  } catch {
      return{
        props:{}  
      }
    }
}