import  {Flex, Table, Tbody, Td, Tr, Image, Text, Icon } from "@chakra-ui/react"
import {SearchInput} from "../../components/SearchInput"
import axios from "axios"
import { GetStaticProps } from 'next'
import {BsArrowUp} from "react-icons/bs"
import {FaRegMoneyBillAlt} from "react-icons/fa"



interface CoinProps {
    id: string,
    symbol: string,
    name: string,
    ImageURL: string,
    current_price: number,
    price_change_percentage: number,
}

export default function HomeBroker(){

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
            <Table w="80%" mt="3em">
                    <Tbody>
                        <Tr
                            color="black"
                            fontWeight="bold"
                            fontSize="20px"
                            bg="#C4C4C4"
                        >
                            <Td >
                                <Flex align="center">
                                    <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" w="50px" />
                                    <Text pl="1em">Bitcoin</Text>
                                </Flex>
                            </Td  >
                            <Td >U$35.594,12</Td>
                            <Td color="#1BAE2A">
                                <Flex align="center">
                                    <Icon as={BsArrowUp} color="black" /> 
                                    <Text>
                                        6.85
                                    </Text>
                                </Flex>
                            </Td>
                            <Td >
                                <Flex align="center">
                                    <Icon as={FaRegMoneyBillAlt} /> 
                                    <Text pl="0.2em">
                                        Buy
                                    </Text>
                                </Flex>
                            </Td>
                            <Td >
                                <Flex align="center">
                                    <Icon as={BsArrowUp} color="black" /> 
                                    <Text pl="0.2em">
                                        Informartions
                                    </Text>
                                </Flex>
                            </Td>
                        </Tr>

                </Tbody>
            </Table>
        </Flex>
    )

}

export const getStaticProps: GetStaticProps = async ()=>{

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    
    // const coins = data.map(coin=>{
    //     return {
    //         id: coin.id,
    //         name: coin.nome,
    //         symbol: coin.symbol.toUpperCase(),
    //         imageURL: coin.image,
    //         current_price: new Intl.NumberFormat('en-US', {
    //           style: 'currency',
    //           currency: 'USD', 
    //         }).format(coin.current_price),
    //         volume: coin.total_volume,
    //         price_change_percentage: coin.price_change_percentage,
    //     }
    // })

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

