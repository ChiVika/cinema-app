import axios from "axios";
import { useEffect, useState } from "react";
import { PORT } from "../../helpers/API";
import { useParams } from "react-router-dom";
import styles from './CinemaDetailsPage.module.css';
import type { CardProps } from "../../helpers/interfaces/Card.props";

const CinemaDetailsPage = () => {
    const {id} = useParams();
    const [filmDetail, setfilmDetail] = useState<CardProps>();

    useEffect(() => {
        const getFilmDetail = async() => {
            try{
                const response = await axios.get(`${PORT}/cinema/film/${id}`)
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
            <section className={styles['card']}>
                <div className={styles['card__header']}>
                    <img src={`${PORT}/${filmDetail?.img}`} alt="картинка фильма" width={298.67} height={300} className={styles['card__img']}/>
                    <div className={styles['card__moreInfo']}>
                        <p className={styles['card__text--bold']}>{filmDetail?.genres[0]}</p>
                        <p className={styles['card__text']}>{filmDetail?.country.name}, {filmDetail?.releaseDate.split(' ')[2]}</p>
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default CinemaDetailsPage;