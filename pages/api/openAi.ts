import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'


type Data = {
  response_text?: string
  error_message?: string
}

const openAI_API = process.env.API_OPENAI as string
const configuration = new Configuration({
  apiKey: openAI_API
})
const openai = new OpenAIApi(configuration)



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const command = req.body.command
    if (!command) {
      res.status(500).json({ error_message: "command required" })
    }
    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: command,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    let response_text: string = response.data.choices[0].text as string
    response_text = response_text.substring(1)
    
    if (response_text) {
      res.status(200).json({ response_text })
    } else {
      res.status(500).json({ error_message: "Something went wrong" })
    }
  } catch (error) {
    res.status(500).json({error_message: "Something went wrong"})
  }
}
