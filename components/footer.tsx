import { CopyIcon } from "@chakra-ui/icons"
import { Box, Divider, Text } from "@chakra-ui/react"

export default function Footer() {
  return (
    <Box w="100vw" p="4">
      <Text textAlign="center" color="blue.500">
        Powered by openAI
      </Text>
      <Text textAlign="center" color="blue.500">
       Created by
        <Text ps="2" textDecor="underline" as="span">
          <a target="_blank" href="https://github.com/samiulbasirfahim">
            Samiul Basir Fahim
          </a>
        </Text>
      </Text>
    </Box>
  )
}
