import { Flex, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";
interface CoinProps{
    name: string;
 }

export function SellButton({name}: CoinProps){

    async function handleDeleteCoin(name:string){
        await axios.post("/api/auth/delete", {name})
      
       }
    
    return(
        <Flex
        align="center"
        onClick={()=>handleDeleteCoin(name)}
        _hover={{
          cursor: "pointer",
          color: "red"
        }}
        >
          <Icon as={FaRegMoneyBillAlt} /> 
          Sell
      </Flex>
    )
}