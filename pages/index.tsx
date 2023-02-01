
import { DeleteIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Box, Button, Container, Divider, Input, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { PropagateLoader } from "react-spinners"

export default function Home() {
    const [conversations, setConversations] = useState<any>([])
    const [disableInput, setDisableInput] = useState<boolean>(false)
    async function submit(e: any) {
        e.preventDefault()
        setDisableInput(true)
        const command: string = e.target.command.value as string
        setConversations([
            { name: "me", text: command },
            ...conversations,
        ])
        e.target.reset()
        const response = await fetch("http://localhost:3000/api/openAi", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ command }),
        })
        const { response_text } = await response.json()
        setDisableInput(false)
        const newConversations = [{ name: "bot", text: response_text }, { name: "me", text: command }, ...conversations]
        localStorage.setItem("conversations", JSON.stringify(newConversations))
        return setConversations(newConversations)
    }

    const clearHistory = () => {
        localStorage.removeItem("conversations")
        setConversations([])
    }

    useEffect(() => {
        const localData: any = localStorage.getItem("conversations")
        const newConversations = JSON.parse(localData)
        if (newConversations) {
            setConversations(newConversations)
        }
    }, [])

    const [darkTheme, setDarkTheme] = useState(true)
    return (
        <Box bg={darkTheme ? "#1e1e2e" : ""} pb="6" pt="16" minH="100vh" minW="100vw" >
            <Container zIndex={100} maxWidth="xl">
                <Box>
                    {disableInput ? <Box display="flex" justifyContent="center" mb="10">
                        <PropagateLoader color="#38a169" />
                    </Box> :
                        <form onSubmit={(e) => submit(e)}>
                            <Box display="flex">
                                <Input
                                    name="command"
                                    placeholder="Ask me something..."
                                    variant="outline"
                                    mb="5"
                                    _placeholder={{
                                        textColor: "blue.500"
                                    }}
                                    disabled={disableInput}
                                    minLength={2}
                                    color="blue.500"
                                    roundedEnd="none"
                                    border="1px"
                                    borderColor="blue.500"
                                    required={true}
                                />
                                <Button roundedStart="none" variant="solid" type="submit" colorScheme="blue">Submit</Button>
                            </Box>
                            <Box display="flex" justifyContent="center" gap="10">
                                {conversations.length > 0 && !disableInput && <Button variant="solid" colorScheme="blue" size="sm" onClick={clearHistory}><DeleteIcon /> Clear history</Button>}
                                {!disableInput && <Button variant="solid" colorScheme="blue" size="sm" onClick={() => setDarkTheme(!darkTheme)}>{darkTheme ? <SunIcon />: <MoonIcon />}</Button>}
                            </Box>
                        </form>}
                    {conversations.length > 0 &&
                        conversations.map((conversation: any, index: number) => (
                            <Box mt="4" rounded="md" shadow="2xl" bg={conversation.name === "bot" ? "blue.500" : "green.500"} key={index}>
                                <Text p="4" color="">{conversation.text}</Text>
                            </Box>
                        ))}
                </Box>
            </Container>
        </Box>
    )
}
