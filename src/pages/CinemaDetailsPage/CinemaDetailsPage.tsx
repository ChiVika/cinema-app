import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../helpers/API";
import { useNavigate, useParams } from "react-router-dom";
import styles from './CinemaDetailsPage.module.css';
import type { CardProps } from "../../helpers/interfaces/Card.props";

const CinemaDetailsPage = () => {
    const {id} = useParams();
    const [filmDetail, setfilmDetail] = useState<CardProps>();
    const navigate = useNavigate();

    useEffect(() => {
        const getFilmDetail = async() => {
            try{
                const response = await axios.get(`${API_URL}/cinema/film/${id}`)
                console.log(response.data.film)
                setfilmDetail(response.data.film)
            }
            catch(error){
                console.log('Ошибка получения детализированной информации о фильме', error)
            }
        }
        getFilmDetail()
        
    }, [id])
    return(
        <>
            <button className={styles['card__back']} onClick={() => navigate('/')}>
                <img src="/back.svg" alt="Вернуться назад" />
                <p>Назад</p>
            </button>
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
                        <h1>{filmDetail?.name}</h1>
                        <p className={styles['card__info']}>Фильм</p>
                        <img src="/Ratings.png" alt="Рейтинг" width={120} height={24} className={styles['card__stars']}/>
                        <p className={styles['card__rating']}>Kinopoisk - {filmDetail?.userRatings.kinopoisk}</p>
                        <p className={styles['card__desc']}>{filmDetail?.description}</p>
                    </div>
                </div>
            </section>
            <section>
                <h2 className={styles['schedule__title']}>Расписание</h2>
            </section>
        </>
    )
}

export default CinemaDetailsPage;