import { DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Container,
  Divider,
  Input,
  Stack,
  Text,
  Image,
  Card,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { PropagateLoader } from "react-spinners"
import { BsFillReplyAllFill } from "react-icons/bs"

export default function Chat() {
  const [conversations, setConversations] = useState<any>([])
  const [disableInput, setDisableInput] = useState<boolean>(false)
  async function submit(e: any) {
    e.preventDefault()
    setDisableInput(true)
    const command: string = e.target.command.value as string
    setConversations([{ name: "me", text: command }, ...conversations])
    e.target.reset()
    const response_first = await fetch("https://openbot.vercel.app/openAi", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        type: "chat",
        command,
      }),
    })
    const { response } = await response_first.json()
    setDisableInput(false)
    const newConversations = [
      { name: "bot", text: response },
      { name: "me", text: command },
      ...conversations,
    ]
    localStorage.setItem("conversations", JSON.stringify(newConversations))
    return setConversations(newConversations)
  }

  const clearHistory = () => {
    localStorage.removeItem("conversations")

    setConversations([])
  }

  useEffect(() => {
    const localConversations: any = localStorage.getItem("conversations")
    const newConversations = JSON.parse(localConversations)
    if (conversations.length > 0) {
      setConversations(newConversations)
    }
  }, [])

  return (
    <Box>
      <head>
        <title>Chat-CloseAI</title>
      </head>
      <Container zIndex={100} maxWidth="xl">
        <Box>
          {disableInput ? (
            <Box display="flex" justifyContent="center" mb="10">
              <PropagateLoader color="#38a169" />
            </Box>
          ) : (
            <form onSubmit={(e) => submit(e)}>
              <Box display="flex">
                <Input
                  name="command"
                  placeholder={"Ask me something..."}
                  variant="outline"
                  mb="5"
                  _placeholder={{
                    textColor: "blue.500",
                  }}
                  disabled={disableInput}
                  minLength={2}
                  color="blue.500"
                  roundedEnd="none"
                  border="1px"
                  borderColor="blue.500"
                  required={true}
                />
                <Button
                  roundedStart="none"
                  variant="solid"
                  type="submit"
                  colorScheme="blue"
                >
                  Submit
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" gap="10">
                {conversations.length > 0 && !disableInput && (
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    size="sm"
                    onClick={clearHistory}
                  >
                    <DeleteIcon /> Clear chat
                  </Button>
                )}
              </Box>
            </form>
          )}
          {conversations.length > 0 &&
            conversations.map((conversation: any, index: number) => (
              <Box
                mt="4"
                rounded="md"
                shadow="2xl"
                bg={conversation.name === "bot" ? "blue.500" : "green.500"}
                key={index}
              >
                <Text p="4" color="">
                  {conversation.name === "bot" && (
                    <BsFillReplyAllFill color="#fff" />
                  )}
                  {conversation.text}
                </Text>
              </Box>
            ))}
        </Box>
      </Container>
    </Box>
  )
}
