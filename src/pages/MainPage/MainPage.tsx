import { useEffect, useState } from 'react';
import styels from './MainPage.module.css';
import axios from 'axios';
import { PORT } from '../../helpers/API';
import type { CardLists } from '../../helpers/interfaces/Card.props';
import Card from '../../components/Card/Card';

const MainPage = () => {
    const [cards, setCards] = useState<CardLists>([])
    
    useEffect(() => {
        const getAllCinema = async() => {
            try{
                const response = await axios.get(`${PORT}/cinema/films`)
                setCards(response.data.films)
            }
            catch(error){
                console.log('Ошибка получения данных о фильмах', error)
            }
        }
        getAllCinema();
    }, [])
    return(
       <>
            <h2 className={styels['headling']}>Афиша</h2>
            <section className={styels['MainPage__container']}>
                <Card cards={cards}/>
            </section>
       </> 
    )
}
export default MainPage;