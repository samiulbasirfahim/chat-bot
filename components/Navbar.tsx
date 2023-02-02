import { Box, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function Navbar() {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <Box bg="#1e1e2e" display="flex" justifyContent="center" gap="6" mb="4">
      <Button
        variant={router.pathname === "/chat" ? "link" : "solid"}
        rounded="sm"
        mt="6"
        size="sm"
        colorScheme={router.pathname === "/chat" ? "red" : "blue"}
        onClick={() => {
          router.push("/chat")
        }}
      >
        Chat
      </Button>
      <Button
        variant={router.pathname === "/image" ? "link" : "solid"}
        rounded="sm"
        mt="6"
        size="sm"
        colorScheme={router.pathname === "/image" ? "red" : "blue"}
        onClick={() => {
          router.push("/image")
        }}
      >
        Image
      </Button>
    </Box>
  )
}
