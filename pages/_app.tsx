import type { AppProps } from "next/app"
import "@/styles/global.css"
import { Box, ChakraProvider } from "@chakra-ui/react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/footer"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        bg="#1e1e2e"
        minW="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Navbar />
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  )
}
