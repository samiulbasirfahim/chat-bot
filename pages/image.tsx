import { DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  Text,
  Image,
  Card,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { PropagateLoader } from "react-spinners"

export default function Image_genarator() {
  const [images, setImages] = useState<any>([])
  const [disableInput, setDisableInput] = useState<boolean>(false)
  async function submit(e: any) {
    e.preventDefault()
    setDisableInput(true)
    const command: string = e.target.command.value as string
    e.target.reset()
    const response_first = await fetch(
      "https://openbot.vercel.app/api/openAi",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          type: "image",
          command,
        }),
      }
    )
    const { response } = await response_first.json()
    setDisableInput(false)
    const newImages = [{ url: response, command }, ...images]
    setImages(newImages)
    console.log(newImages)
    localStorage.setItem("images", JSON.stringify(newImages))
  }

  const clearHistory = () => {
    localStorage.removeItem("images")
    setImages([])
  }

  useEffect(() => {
    const localImages: any = localStorage.getItem("images")
    const newImages = JSON.parse(localImages)
    console.log(newImages)
    if (newImages) {
      setImages(newImages)
    }
  }, [])

  return (
    <Box>
      <head>
        <title>Image-CloseAI</title>
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
                  placeholder={"Wanna draw something..."}
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
                {images.length > 0 && !disableInput && (
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    size="sm"
                    onClick={clearHistory}
                  >
                    <DeleteIcon /> Clear image
                  </Button>
                )}
              </Box>
            </form>
          )}
          <Box display="flex" alignItems="center" flexDirection="column">
            {images.length > 0 &&
              images.map((image: { url: string; command: string }) => {
                return (
                  <Card
                    key={image.url}
                    mt="10"
                    mx="2"
                    maxW="md"
                    p="5"
                    bg="green.200"
                  >
                    <Text
                      fontSize="xl"
                      textAlign="center"
                      my="2"
                      fontWeight="bold"
                      color="blue.500"
                    >
                      {image.command}
                    </Text>
                    <Image boxSize="md" src={image.url} borderRadius="lg" />
                  </Card>
                )
              })}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
