import { useRouter } from "next/router"
import axios from "axios";

import { Flex, Icon, theme, useToast } from "@chakra-ui/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

interface CoinProps{
    name: string;
 }

export function SellButton({name}: CoinProps){
  const router = useRouter();
   //Toastfy mensage
   const toast = useToast(); 
  //Delete coins in FaunaDB API 
  const handleDeleteCoin = async (name:string)=>{
    try{
      await axios.post("/api/delete", {name})
      toast({
        title: 'Your Sale are OK!.',
        description: `${name} was sold with success.`,
        status: 'error',
        duration: 4000, //4 seconds
        isClosable: true, 
      })
      router.reload();
    }catch{
      toast({
        title: 'Sorry Your Sale Failed!',
        description: `"We cant concluision your sale, try again later.`,
        status: 'error',
        duration: 4000, //4 seconds
        isClosable: true,
      })
      router.reload();
    }
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