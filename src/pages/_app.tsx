import '../styles/theme.ts'
import type { AppProps } from 'next/app'
import { ChakraProvider} from "@chakra-ui/react" 
import { theme } from '../styles/theme'
import { Header } from '../components/Header'
import CoinsProvider from "../context/coins"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <CoinsProvider>
        <Header />
        <Component {...pageProps} />
      </CoinsProvider>
    </ChakraProvider>   
  )
}

export default MyApp
