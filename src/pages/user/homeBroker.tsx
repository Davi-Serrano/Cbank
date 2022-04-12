import { GetServerSideProps } from 'next'
import { useCoins }  from "../../context/coins"
import { getSession } from "next-auth/react"
import { api } from "../../services/api"

import  {Flex, Table, Tbody} from "@chakra-ui/react"

import {SearchInput} from "../../components/SearchInput"
import { TableCoin } from "../../components/TableCoins"

interface CoinProps {
    id: string,
    symbol: string,
    name: string,
    image: string,
    total_volume: number,
    price_change_percentage_24h: number,
    current_price: number,
}
interface CoinsProps {
    coins: Array<CoinProps>
}

export default function HomeBroker({coins}:CoinsProps){
    const { search } = useCoins()

    const filtredCoins = coins.filter( coin =>
        coin.name.toLowerCase().includes(search))

    return(
        <Flex
            flexDir="column"
            w="80%"
            maxW="1280PX"
            bg="#2C2C2C"
            align='center'
            justify="center"
            m="auto"
            mt="5%"
            pb="2em"
        >    
            <SearchInput />
            <Table w="80%" variant="unstyled" mt="3em">
                    <Tbody>
                        {filtredCoins.map(coin => {
                            return(
                                <TableCoin
                                  key={coin.id}
                                  id={coin.id}
                                  name={coin.name}
                                  symbol={coin.symbol}
                                  current_price={coin.current_price}
                                  total_volume={coin.total_volume}
                                  price_change_percentage_24h={coin.price_change_percentage_24h}
                                  image={coin.image}
                                />
                                )
                        })}
                </Tbody>
            </Table>
        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req})=>{
    const session = await getSession({req})

    if(!session){
        return{
          redirect:{
            destination: "/",
            permanent: false
          }
        }
      }

    const response = await api.get("/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    
    const coins = response.data.map((coin: CoinProps) =>{
        return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            image: coin.image,
            total_volume: coin.total_volume,
            price_change_percentage_24h: coin.price_change_percentage_24h.toFixed(2),
            current_price: coin.current_price.toFixed(2),
        }
    })
    return {
      props:{
        coins
      }
    }

}

