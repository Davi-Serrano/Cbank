export default function bankCoins (){
      return(
        <Flex
          justify="space-around"
          align="center"
          h="80%"
          bg="#2C2C2C"
          mx="auto"
          mt="2em"
         >
            <Flex h="45%" bg="#222222">
                <Box>
                  <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" />
                  <Text>Bitcoin</Tetx>
                  <Flex>
                    <Text>^6.85</Text>
                    <Text>U$42558.85</Tetx>
                  </Flex>
                </Box>

                <Text>
                  Valor da Compra: U$42558.85
                </Text>
              
              <Flex>
                  <Text>
                      Quantidade: 2
                  </Text>
                  <Box>
                      <Text>
                        Buy
                      </Text>
                      <Text>
                        Sell
                      </Text>
                  </Box>
              </Flex>
              <Flex>
                <Text>
                    Total: U$35.251,00
                </Text>
             </Flex>
          
          
        </Flex>
    )
}
