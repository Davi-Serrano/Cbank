import  {Flex, Table, Tbody, Td, Tr, Image } from "@chakra-ui/react"
import {SearchInput} from "../../components/SearchInput"
import axios from "axios"
import { GetStaticProps } from 'next'




interface CoinProps {
    coin: Array []
}

export default function HomeBroker({coins} ){

    return(
        <Flex flexDir="column" w="80%" bg="#2C2C2C" align='center' justify="center" m="auto" mt="5%">
            <SearchInput />
             <Table>
                    <Tbody>
                        <Tr>
                          <Td><Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" w="50px" />Bitcoin</Td>
                          <Td>U$35.594,12</Td>
                          <Td>6.85</Td>
                          <Td>Buy</Td>
                          <Td>Informations</Td>
                        </Tr>
                   </Tbody>
            </Table>
            
        </Flex>
    )

}

export const getStaticProps: GetStaticProps = async ()=>{

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    
   

    const coins = response.data.map((coin: CoinProps) =>{
        return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            imageURL: coin.image,
            current_price: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD', 
            }).format(coin.current_price),
            volume: coin.total_volume,

        }
    })

    console.log(coins)

    return {
      props:{
        coins
      },      
      revalidate: 60 // 1min
    }

}

