import { Flex, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";
interface CoinProps{
    name: string;
 }

export function SellButton({name}: CoinProps){

    async function handleDeleteCoin(name:string){
        await axios.post("/api/auth/coins", {name})
      
       }
    
    return(
        <Flex
        align="center"
        _hover={{
          cursor: "pointer"
        }}
        >
          <Icon color="red" as={FaRegMoneyBillAlt} onClick={()=>handleDeleteCoin(name) }/> 
          Sell
      </Flex>
    )
}