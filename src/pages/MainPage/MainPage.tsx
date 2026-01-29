import { useEffect, useState } from 'react';
import styels from './MainPage.module.css';
import axios from 'axios';
import { API_URL } from '../../helpers/API';
import type { CardLists } from '../../helpers/interfaces/Card.props';
import Card from '../../components/Card/Card';
import ButtonHeader from '../../components/ButtonHeader/ButtonHeader';

const MainPage = () => {
  const [cards, setCards] = useState<CardLists>([]);
    
  useEffect(() => {
    const getAllCinema = async() => {
      try{
        const response = await axios.get(`${API_URL}/cinema/films`);
        setCards(response.data.films);
      }
      catch(error){
        console.log('Ошибка получения данных о фильмах', error);
      }
    };
    getAllCinema();
  }, []);
  return(
    <>
      <div className={styels['MainPage__head']}>
        <ButtonHeader variant='back'/>
        <h2 className={styels['headling']}>Афиша</h2>
      </div>
      <section className={styels['MainPage__container']}>
        <Card cards={cards}/>
      </section>
    </> 
  );
};
export default MainPage;