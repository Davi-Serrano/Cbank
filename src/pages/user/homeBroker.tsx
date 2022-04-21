import { GetServerSideProps } from 'next'
import { getSession } from "next-auth/react"
import Head from 'next/head'

import { api } from "../../services/api"
import { useCoins }  from "../../context/coins"

import { List, ListRowRenderer, AutoSizer } from "react-virtualized"

import  {Flex, Table, Tbody, Text, useMediaQuery, Box, } from "@chakra-ui/react"


import {SearchInput} from "../../components/HomeBroker/SearchInput"
import { TableCoin } from "../../components/HomeBroker/TableCoins"
import { CardCoins } from '../../components/HomeBroker/CardCoins'

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
    //Show coins results off setCoins on SearchInput component
    const { search } = useCoins();
    //Filter coins for search value  
    const filtredCoins = coins.filter( coin =>
        coin.name.toLowerCase().includes(search)
    );
    //React-virtualized map on filtredCoins and display 4 for time
    const rowRender: ListRowRenderer = ({index, key, style})=>{
        return (  
            <div key={key} style={style}>

                <TableCoin
                    id={filtredCoins[index].id}
                    name={filtredCoins[index].name}
                    symbol={filtredCoins[index].symbol}
                    current_price={filtredCoins[index].current_price}
                    total_volume={filtredCoins[index].total_volume}
                    price_change_percentage_24h={filtredCoins[index].price_change_percentage_24h}
                    image={filtredCoins[index].image}
                />
            </div>     
           
        )
    };
    //Verification the width of screen for mobile version 
    const [ isLargerThan1280 ] = useMediaQuery('(min-width: 1280px)');

    return(
        <>
            <Head>
                <title>HomeBroker | CBank</title>
            </Head>

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

                {/* Verification the large of screen for render desktop or mobile version */}
                { isLargerThan1280 ? 
                //Desktop Version
                <Table w="80%" variant="unstyled" mt="3em">
                    <Tbody h="80vh">
                        <AutoSizer>
                            {({height, width})=>(
                            <List 
                                height={height}
                                rowHeight={130}
                                width={width}
                                overscanRowCount={5}
                                rowCount={filtredCoins.length}
                                rowRenderer={rowRender}
                            />
                            )}
                        </AutoSizer>                  
                    </Tbody>
                </Table> 
                : 
                //Mobile Version
                <Box>
                    {filtredCoins.map(coin=>{ return(
                        <CardCoins 
                            key={coin.id}
                            id={coin.id}
                            name={coin.name}
                            symbol={coin.symbol}
                            current_price={coin.current_price}
                            total_volume={coin.total_volume}
                            price_change_percentage_24h={coin.price_change_percentage_24h}
                            image={coin.image}
                        />
                        )}
                    )}        
                </Box> 
                }
            </Flex>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req})=>{
    const session = await getSession({req})

    //Verfication if user has autorization, else go to login page
    if(!session){
        return{
          redirect:{
            destination: "/",
            permanent: false
          }
        }
    };
    //API get datas
    const response = await api.get("/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    
    //Formated datas for API
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
    });

    return {
      props:{
        coins
      }
    };

}

