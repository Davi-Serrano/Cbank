import  {Flex } from "@chakra-ui/react"
import {SearchInput} from "../../components/SearchInput"
import axios from "axios"
import {  GetStaticProps } from 'next'

interface CoinProps {
    id: string,
    symbol: string,
    name: string,
    ImageURL: string,
    current_price: number,
    price_change_percentage: number,
}

export default function HomeBroker({coins}: CoinProps){

    return(
        <Flex w="80%" bg="#2C2C2C" justify="center" m="auto" mt="5%">
            <SearchInput />
            
        </Flex>
    )

}

const getStaticProps: GetStaticProps = async ()=>{

    const data = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    
    const coins  = data.map(coin =>{
        return {
            id: coin.id,
            name: coin.nome,
            symbol: coin.symbol.toUpperCase(),
            imageURL: coin.image,
            current_price: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD', 
            }).format(coin.current_price),
            volume: coin.total_volume,
            price_change_percentage: coin.price_change_percentage,
        }
    })

    return {
      props:{
          coins
      }
    }
}

