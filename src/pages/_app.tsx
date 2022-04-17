import '../styles/theme.ts'
import type { AppProps } from 'next/app'
import { ChakraProvider} from "@chakra-ui/react" 
import { theme } from '../styles/theme'
import { Header } from '../components/Header'
import CoinsProvider from "../context/coins"
import {SessionProvider } from "next-auth/react"
import NextProgess from "nextjs-progressbar"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <SessionProvider session={pageProps.session}>
        <CoinsProvider>
          <Header />
          <Component {...pageProps} />
          <NextProgess />
        </CoinsProvider>
      </SessionProvider>
    </ChakraProvider>   
  )
}

export default MyApp
