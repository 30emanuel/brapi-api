import { useState } from 'react'
import './styles.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'


export const Home = () => {
    const [searchValue, setSearchValue] = useState('')
    const [list, setList] = useState([])
    const url = 'https://brapi.dev/api/quote'

    const search = async () =>{
        const res = await axios.get(`${url}/list?search=${searchValue}`)
        console.log(res.data.stocks)

        res.data.stocks.map((stock) => {
            stock.changeSymbolPercent = '='
            if(stock.change > 0){
                stock.changeSymbolPercent = '▲'
            }

            if(stock.change < 0){
                stock.changeSymbolPercent = '▼'
            }
        })

        setList(res.data.stocks)
    }
    
    return(
        <div className='home'>
            <div className='search'>
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                <button onClick={search}>Pesquisar</button>
            </div>
            <div className='list'>
                <div className="list-container">
                    {list.map((stock) =>(
                        <Link to={`/quote/${stock.stock}`}>
                            <div className="card">
                                <img src={stock.logo} alt="" />
                                <div className="text">
                                    <h2>{stock.stock}</h2>
                                    <p>{stock.name}</p>
                                    <p>{stock.close.toLocaleString('pt-BR', { style: 'currency', currency: `BRL` })}</p>
                                    <p>{stock.changeSymbolPercent} {stock.change.toFixed(2)}%</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}