import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const Chart = dynamic(()=> import("react-apexcharts"),{
  ssr: false
})

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
]


export default function DataSCoin() {
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
                
              <Chart options={options} series={series} type="area" height={350} width={500} />
        </Flex>

        <Box ml="5em" fontSize={25}> 
            <Flex align="center">
              <Text fontWeight="700">Volume :</Text>
              <Text pl="1em">R$:1.000.000</Text>
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