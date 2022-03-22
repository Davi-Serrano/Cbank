import  {Flex } from "@chakra-ui/react"
import {SearchInput} from "../../components/SearchInput"

export default function HomeBroker(){

    return(
        <Flex w="80%" bg="#2C2C2C" justify="center" m="auto" mt="5%">
            <SearchInput />
        </Flex>
    )

}