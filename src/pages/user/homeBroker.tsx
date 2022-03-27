import { useCoins }  from "../../context/coins"
import { GetStaticProps } from 'next'
import Link from "next/link"

import  {Flex, Table, Tbody, Td, Tr, Image, Text, Icon} from "@chakra-ui/react"
import {BsArrowUp, BsArrowDown} from "react-icons/bs"
import {FaRegListAlt} from "react-icons/fa"

import {SearchInput} from "../../components/SearchInput"
import { BuyButton } from "../../components/BuyButton"

import { api } from "../../services/api"

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
                                <Tr
                                    key={coin.id}
                                    color="black"
                                    fontWeight="bold"
                                    fontSize="20px"
                                    bg="#C4C4C4"
                                    borderBottom="9px solid #2C2C2C"
                                >
                                        <Td>
                                            <Flex align="center">
                                                <Image src={coin.image} w="50px" />
                                                <Text pl="1em">{coin.name}</Text>
                                            </Flex>
                                        </Td  >
                                        <Td w="100px" >U{coin.current_price}</Td>
                                        
                                        
                                                    {coin.price_change_percentage_24h > 0 ? 
                                                    
                                                        <Td w="50px" color="#1BAE2A">
                                                        <Flex align="center">
                                                            <Icon as={BsArrowUp}  /> 
                                                                <Text>
                                                                    {coin.price_change_percentage_24h}
                                                                </Text>
                                                            </Flex>
                                                        </Td> 
                                                        :
                                                        <Td w="50px" color="red">
                                                            <Flex align="center">
                                                            <Icon as={BsArrowDown} rotate="180" /> 
                                                                <Text>
                                                                    {coin.price_change_percentage_24h}
                                                                </Text>
                                                            </Flex>
                                                        </Td>

                                                
                                                }
                                        
                                        <Td w="50px" >
                                                <BuyButton/>
                                        </Td>
                                        <Td w="50px" >
                                            <Link key={coin.id} href={`/user/${coin.id}`}>    
                                                <a>
                                                    <Flex
                                                      align="center"
                                                      _hover={{
                                                        cursor: "pointer",
                                                        color: "#07a5fa"
                                                    }}
                                                      >
                                                        <Icon as={FaRegListAlt} /> 
                                                        <Text pl="0.2em">
                                                            Informartions
                                                        </Text>
                                                    </Flex>
                                                </a>
                                            </Link> 
                                        </Td>
                                </Tr>
                            )
                        })}

                </Tbody>
            </Table>
        </Flex>
    )

}

export const getStaticProps: GetStaticProps = async ()=>{

    const response = await api.get("/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    
    const coins = response.data.map((coin: CoinProps) =>{
        return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            image: coin.image,
            total_volume: coin.total_volume,
            price_change_percentage_24h: coin.price_change_percentage_24h.toFixed(2),
            current_price: new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD', 
            }).format(coin.current_price),
        }
    })
    return {
      props:{
        coins
      },      
      revalidate: 10
    }

}

