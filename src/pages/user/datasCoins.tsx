import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const Chart = dynamic(()=> import("react-apexcharts"),{
  ssr: false
})

const options = {


};
const series = [
  {
  name: "serie1", data: [31,120,10,45],}
]
  



export default function DataSCoin() {
  return(
    <SimpleGrid
      justifyItems="flex-start"
      minChildWidth="320px"
      bg="#2C2C2C"
      w="70%"
      h="400px"
      m="auto"
      mt="2em"
      p="2em"
      >
    <Flex
        flexDir="column"
        align="center"
        ml="45px"
        justify="flex-start"
        h="100px"
        >

            <Flex
              align="center"
              justify="flex-start"
              h="100px"
              mb="1em"
              >

                  <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?" height='30px' width='25px' /> 
                  <Text fontSize={25} px="2em">  
                      <strong> BitCoin: </strong> R$360.000,00
                  </Text>
            </Flex>
            
            <Chart options={options} series={series} type="area" height={250} width={500} />
      </Flex>

      <Box py="1em" m="auto" ml="15em"> 

        <Flex align="center">
          <Text fontWeight="700">Volume :</Text>
          <Text pl="1em">R$:1.000.000</Text>
        </Flex>
          
        <Flex align="center">
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