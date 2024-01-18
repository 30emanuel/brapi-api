import { useEffect, useState } from 'react'
import './styles.scss'
import axios from 'axios'


export const Home = () => {
    const url = 'https://brapi.dev/api/quote'
    const [searchValue, setSearchValue] = useState('')

    const search = async () =>{
        const res = await axios.get(`${url}/list?search=${searchValue}`)
        console.log(res.data)
    }
    
    return(
        <div className='home'>
            <div className='search'>
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                <button onClick={search}>Pesquisar</button>
            </div>
        </div>
    )
}