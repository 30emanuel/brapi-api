import { useEffect, useState } from 'react'
import './styles.scss'
import axios from 'axios'
import { Ia } from '../Components/Ia'
import { useParams, Link } from 'react-router-dom'

export const Quote = () => {
    const url = 'https://brapi.dev/api/quote'
    const [infos, setInfos] = useState(null)
    const [symbolPercent, setSymbolPercent] = useState('=')
    const [updatedAt, setUpdatedAt] = useState('')
    const params = useParams()

    const key = process.env.REACT_APP_BRAPIAPI_KEY

    const search = async () => {
        const res = await axios.get(`${url}/${params.search}?modules=summaryProfile&token=${key}`)

        setInfos(res.data.results[0])
        console.log(res.data.results[0])

        if (res.data.results[0].regularMarketChange > 0) {
            setSymbolPercent('▲')
        } else {
            setSymbolPercent('▼')
        }

        const updatedAt = new Date(res.data.results[0].updatedAt)
        const formattedDate = updatedAt.toLocaleString()
        setUpdatedAt(formattedDate)
    }

    useEffect(() => {
        search()
    }, [])

    return (
        <div className='quote'>
            <div className="button-container">
                <Link to={`/`}>
                    <button>Voltar</button>
                </Link>
            </div>
            {infos !== null ? (
                <>
                    <div className='profile'>
                        <div className='header'>
                            <div className='text'>
                                <img src={infos.logourl} alt="" />
                                <div>
                                    <p className='text-primary'>{infos.symbol}</p>
                                    <p className='text-secondary'>{infos.longName}</p>
                                </div>
                            </div>
                            <div className='updated-at'>
                                <p className='text-secondary'>Última atualização</p>
                                <p className='text-primary'>{updatedAt}</p>
                            </div>
                        </div>
                        <div className='infos-price'>
                            <div className='container-info'>
                                <p className='text-secondary'>Preço</p>
                                <p className='text-primary'>{infos.regularMarketPrice.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                            </div>
                            <div className='container-info'>
                                <p className='text-secondary'>Variação (dia)</p>
                                <p className='text-primary'>{infos.regularMarketChange.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })} ({infos.regularMarketChangePercent.toFixed(2)}%){symbolPercent}</p>
                            </div>
                            <div className='container-info'>
                                <p className='text-secondary'>Min. 52 Semanas</p>
                                <p className='text-primary'>{infos.fiftyTwoWeekLow.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                            </div>
                            <div className='container-info'>
                                <p className='text-secondary'>Max. 52 Semanas</p>
                                <p className='text-primary'>{infos.fiftyTwoWeekHigh.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                            </div>
                            <div className='container-info'>
                                <p className='text-secondary'>Capitalização de mercado</p>
                                {infos.marketCap !== null ? (
                                    <p className='text-primary'>{infos.marketCap.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                ) : <p className='text-primary'>---</p>}
                            </div>
                        </div>
                        <div className='summary-profile'>
                            {infos.summaryProfile?.address1 ? (
                                <p className='text-three'>Endereço: {infos.summaryProfile?.address1}, {infos.summaryProfile?.city}, {infos.summaryProfile?.state}, {infos.summaryProfile?.zip}</p>
                            ) : <p className='text-three'>Endereço: Sem endereço</p>}
                            {infos.summaryProfile?.phone ? (
                                <p className='text-three'>Telefone: {infos.summaryProfile?.phone}</p>
                            ) : <p className='text-three'>Telefone: Sem telefone</p>}
                            {infos.summaryProfile?.fullTimeEmployees ? (
                                <p className="text-three">Funcionários: {infos.summaryProfile?.fullTimeEmployees}</p>
                            ) : <></>}
                        </div>
                        <div className='overview'>
                            <h2>Visão geral da empresa</h2>
                            <div className="container">
                                <div>
                                    <p className='text-secondary'>Preço Atual</p>
                                    <p className='price'>{infos.regularMarketPrice.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                </div>
                                <div>
                                    <p className='text-secondary'>Valor de mercado</p>
                                    {infos.marketCap !== null ? (
                                        <p className='price'>{infos.marketCap.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                    ) : <p className='price'>---</p>}
                                </div>
                                <div>
                                    <p className='text-secondary'>Abertura</p>
                                    <p className='price'>{infos.regularMarketOpen.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                </div>
                                <div>
                                    <p className='text-secondary'>Preço Maximo</p>
                                    <p className="price">{infos.regularMarketDayHigh.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                </div>
                                <div>
                                    <p className='text-secondary'>Preço mínimo</p>
                                    <p className='price'>{infos.regularMarketDayLow.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                </div>
                                <div>
                                    <p className='text-secondary'>Volume</p>
                                    <p className="price">{infos.regularMarketVolume.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                </div>
                                <div className='detach'>
                                    <p className='text-secondary'>Fechamento anterior</p>
                                    <p className="price">{infos.regularMarketPreviousClose.toLocaleString('pt-BR', { style: 'currency', currency: `${infos.currency}` })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Ia />
                </>
            ) : <></>}
        </div>
    )
}