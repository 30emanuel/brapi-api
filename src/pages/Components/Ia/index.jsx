import { useEffect, useState } from 'react'
import './styles.scss'
import axios from 'axios'

export const Ia = () => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions'
    const apiKey = process.env.REACT_APP_CHATGPT_KEY

    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')

    const getResponseIa = async () => {
        if (prompt !== '') {
            setLoading(true)
            const response = await axios.post(apiUrl, {
                messages: [{ role: 'system', content: 'You are a helpful assistant.' }, {
                    role: 'user', content: `${prompt}`
                }],
                model: 'gpt-3.5-turbo',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            })
            setLoading(false)
            setResponse(response.data.choices[0].message.content)
        }
    }


    return (
        <div className='ia'>
            <div className="container">
                <h2 className='text-secondary'>IA</h2>
                <p className='tip'>Use a IA para tirar duvidas sobre a ações utilizando os dados.</p>
                <textarea name="prompt" value={prompt} onChange={e => setPrompt(e.target.value)}></textarea>
                <button onClick={getResponseIa} disabled={loading}>Enviar</button>
                {loading &&
                    <p>Aguardando resposta da IA</p>
                }
                {response &&
                    <p>Resposta da IA: {response}</p>
                }
            </div>
        </div>
    )
}