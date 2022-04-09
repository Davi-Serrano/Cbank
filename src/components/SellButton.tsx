import { Flex, Icon } from "@chakra-ui/react";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useRouter } from "next/router"

interface CoinProps{
    name: string;
 }

export function SellButton({name}: CoinProps){
  const router = useRouter() 

    async function handleDeleteCoin(name:string){
        await axios.post("/api/auth/delete", {name})
        router.reload()
      
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