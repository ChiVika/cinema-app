import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../helpers/API';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CinemaDetailsPage.module.css';
import type { CardProps } from '../../helpers/interfaces/Card.props';
import type { ScheduleProps } from '../../helpers/interfaces/Schedule.props';
import cn from 'classnames';
import Button from '../../components/Button/Button';
import ButtonHeader from '../../components/ButtonHeader/ButtonHeader';
import { observer } from 'mobx-react-lite';
import SeanceStore from '../../store/Seance.store';

const CinemaDetailsPage = observer(() => {
  const MAX_WORDS = 29;
  const { id } = useParams();
  const [filmDetail, setfilmDetail] = useState<CardProps>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleProps[]>([]);
  const [isActiveButton, setIsActiveButton] = useState<number>(0); //это про дату
  const [descOpen, setDescOpen] = useState<boolean>(false);


  useEffect(() => {
    const getFilmDetail = async() => {
      if(!id){
        return;
      }
      try{
        const response = await axios.get(`${API_URL}/cinema/film/${id}`);
        console.log(response.data.film);
        setfilmDetail(response.data.film);
        SeanceStore.setCurrentFilm(id);
      }
      catch(error){
        console.log('Ошибка получения детализированной информации о фильме', error);
      }
    };
    getFilmDetail();
        
  }, [id]);

  useEffect(() => {
    const getSchedule = async() => {
      if(!id){
        return;
      }
      try{
        const response = await axios.get(`${API_URL}/cinema/film/${id}/schedule`);
        console.log(response.data.schedules);
        setSchedule(response.data.schedules);
        SeanceStore.setCurrentDate(response.data.schedules[0].date);
        SeanceStore.setCurrentHall(response.data.schedules[0].seances[0].hall.name);
        SeanceStore.setCurrentTime(response.data.schedules[0].seances[0].time);

      }
      catch(error){
        console.log('Ошибка получения данных о расписании фильма', error);
      }
    };
    getSchedule();
  }, [id]);


  const getWeekDay = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    const date = new Date(`20${year}-${month}-${day}`);
    const dataOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][date.getDay()];

    const dateSplit = dateString.trim().split('.');
    const monthOfText = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const monthData = monthOfText[parseInt(dateSplit[1]) - 1];

    return `${dataOfWeek}, ${dateSplit[0]} ${monthData}`;
  };

  const hallTranslation = (hall: string) => {
    if (hall == 'Red'){
      return 'Красный';
    }
    else if (hall == 'Green'){
      return 'Зеленый';
    }
    else{
      return 'Синий';
    }
  };

  const hide_desc = (text: string , max_len: number) => {
    const world = text.split(' ');
    if(world.length <= max_len){
      return text;
    }
    else{
      const hide_text = world.slice(0, max_len).join(' ');
      return `${hide_text}... `;
    }
  };

  const toggleDescription = () => {
    setDescOpen(!descOpen);
  };




  
  


  return(
    <>
      <button className={styles['card__back']} onClick={() => navigate('/')}>
        <img src="/back.svg" alt="Вернуться назад" />
        <p>Назад</p>
      </button>
      <div className={styles['MainPage__head']}>
        <ButtonHeader variant='close' onClick={() => navigate('/')}/>
        <h2 className={styles['headling']}>О фильме</h2>
      </div>
      <section>
        <div className={styles['card']}>
          <div className={styles['card__header']}>
            <img src={`${API_URL}/${filmDetail?.img}`} alt="картинка фильма" width={298.67} height={300} className={styles['card__img']}/>
            <div className={styles['card__moreInfo']}>
              <p className={styles['card__text--bold']}>{filmDetail?.genres[0]}</p>
              <p className={styles['card__text']}>{filmDetail?.country.name}, {filmDetail?.releaseDate.split(' ')[2]}</p>
            </div>
          </div>
          <div className={styles['card__datas']}>
            <h1 className={styles['card__title']}>{filmDetail?.name}</h1>
            <p className={styles['card__info']}>Фильм</p>
            <img src="/Ratings.png" alt="Рейтинг" width={120} height={24} className={styles['card__stars']}/>
            <p className={styles['card__rating']}>Kinopoisk - {filmDetail?.userRatings.kinopoisk}</p>
            <div className={styles['card__block-text']}>
              <p className={styles['card__desc--mobile']}>
                {filmDetail?.description ? (descOpen ? filmDetail.description: hide_desc(filmDetail.description, MAX_WORDS)) : ''}
                {filmDetail?.description && filmDetail.description.split(' ').length > MAX_WORDS && (
                  <button onClick={toggleDescription} className={styles['card__desc-more']}>{descOpen ? 'скрыть' : 'раскрыть'}</button>)
                }
              </p>
            </div>
            <div className={styles['card__block-text']}>
              <p className={styles['card__desc']}>{filmDetail?.description}</p>
            </div>

          </div>
        </div>
      </section>
      <section>
        <h2 className={styles['schedule__title']}>Расписание</h2>
        <div className={styles['schedule__data']}>
          {schedule.map((item, index) => (
            <div key={index}>
              <div className={styles['schedule__data-container']}>
                <button 
                  className={cn(
                    styles['schedule__data--button'],
                    {
                      [styles['active']]: isActiveButton === index,
                      [styles['with-divider']]: index !== schedule.length - 1,
                    },
                  )}
                  onClick={() => {
                    setIsActiveButton(index);
                    SeanceStore.setCurrentDate(item.date);
                  }}
                >
                  {getWeekDay(item.date)}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['schedule__halls']}>
          {schedule.filter((_, item) => item === isActiveButton).map(day => (
            <div key={day.date} className={styles['hall__container']}>
              {(() => {
                const halls = new Map<string, string[]>();
                day.seances.forEach(s => {
                  if (!halls.has(s.hall.name)) halls.set(s.hall.name, []);
                    halls.get(s.hall.name)!.push(s.time);
                });
                return Array.from(halls.entries()).map(([hallName, times]) => (
                  <div key={hallName} className={styles['hall__block']}>
                    <h3 className={styles['hall__colour']}>{hallTranslation(hallName)} зал</h3>
                    <div className={styles['hall__times']}>
                      {times.map((time) => 
                        <button key={time} className={cn(styles['hall__time-button'], {
                          [styles['active-time']]: SeanceStore.currentTime == time,
                        })} onClick={() => {
                          SeanceStore.setCurrentHall(hallName);
                          SeanceStore.setCurrentTime(time);
                        }}>{time}</button>,
                      )}
                    </div>
                  </div>
                ));
              })()}
            </div>
          ))}
        </div>
        <Button className={styles['schedule__button']} onClick={() => navigate(`/cinema/${SeanceStore.currentFilm}/places`)}>Продолжить</Button>
      </section>
    </>
  );
});

export default CinemaDetailsPage;