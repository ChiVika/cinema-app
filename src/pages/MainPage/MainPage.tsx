import { useEffect, useState } from 'react';
import styels from './MainPage.module.css';
import axios from 'axios';
import { API_URL } from '../../helpers/API';
import type { CardLists } from '../../helpers/interfaces/Card.props';
import Card from '../../components/Card/Card';
import ButtonHeader from '../../components/ButtonHeader/ButtonHeader';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
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
      <footer className={styels['footer']}>
        <nav className={styels['footer__navs']}>
          <NavLink to='/' className={({ isActive }) => (cn(styels['footer__link'], {
            [styels['active']]: isActive,
          }))}>
            <img src="/Movie.svg" alt="Афиша" width={24} height={24}/>
            Афиша
          </NavLink>
          <NavLink to='/ticket' className={({ isActive }) => (cn(styels['footer__link'], {
            [styels['active']]: isActive,
          }))}>
            <img src="/ticket.svg" alt="Билеты" width={24} height={24}/>
            Билеты
          </NavLink>
          <NavLink to='/profile' className={({ isActive }) => (cn(styels['footer__link'], {
            [styels['active']]: isActive,
          }))}>
            <img src="/profile.svg" alt="Профиль" width={24} height={24}/>
            Профиль
          </NavLink>
        </nav>
      </footer>
    </> 
  );
};
export default MainPage;